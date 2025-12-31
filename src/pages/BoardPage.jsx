import { useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import useAppStore from '../store/useAppStore';

import BoardColumn from '../components/BoardColumn';
import TaskModal from '../components/TaskModal';
import TaskDetailsPanel from '../components/TaskDetailsPanel';
import TaskFilter from '../components/TaskFilter';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

function BoardPage() {
  const { projectId } = useParams();

  /* ======================
     Zustand state
  ====================== */
  const project = useAppStore(s =>
    s.projects.find(p => p.id === projectId)
  );
  const allTasks = useAppStore(s => s.tasks);
  const addTask = useAppStore(s => s.addTask);
  const reorderTasks = useAppStore(s => s.reorderTasks);

  /* ======================
     Local UI state
  ====================== */
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [filters, setFilters] = useState({
    keyword: '',
    priority: '',
    type: '',
    assignee: ''
  });

  /* ======================
     DnD sensors
  ====================== */
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  if (!project) {
    return <p className="p-4">Project not found</p>;
  }

  /* ======================
     Derived data
  ====================== */

  // 1. Tasks belonging to this project
  const projectTasks = useMemo(() => {
    return allTasks.filter(t => t.projectId === projectId);
  }, [allTasks, projectId]);

  // 2. Apply filters (search + dropdowns)
  const filteredTasks = useMemo(() => {
    return projectTasks.filter(task => {
      const matchesKeyword =
        filters.keyword === '' ||
        task.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        (task.description || '')
          .toLowerCase()
          .includes(filters.keyword.toLowerCase());

      const matchesPriority =
        filters.priority === '' || task.priority === filters.priority;

      const matchesType =
        filters.type === '' || task.type === filters.type;

      const matchesAssignee =
        filters.assignee === '' || task.assignee === filters.assignee;

      return (
        matchesKeyword &&
        matchesPriority &&
        matchesType &&
        matchesAssignee
      );
    });
  }, [projectTasks, filters]);

  /* ======================
     Drag handler
  ====================== */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    const overTask = filteredTasks.find(t => t.id === over.id);
    if (!overTask) return;

    const toIndex = filteredTasks
      .filter(t => t.column === overTask.column)
      .findIndex(t => t.id === over.id);

    reorderTasks({
      taskId: active.id,
      toColumn: overTask.column,
      toIndex
    });
  };

  /* ======================
     Static data (placeholder)
  ====================== */
  const assignees = ['Alice', 'Bob', 'Charlie'];

  /* ======================
     Render
  ====================== */
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="p-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            {project.name} Board
          </h1>
          <button
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
          >
            + New Task
          </button>
        </div>

        {/* Filters */}
        <TaskFilter
          assignees={assignees}
          onFilterChange={setFilters}
        />

        {/* Board */}
        <div className="overflow-x-auto">
          <SortableContext
            items={project.columns}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex gap-4 min-h-[70vh]">
              {project.columns.map(column => (
                <BoardColumn
                  key={column}
                  column={column}
                  projectId={projectId}
                  tasks={filteredTasks.filter(t => t.column === column)}
                  onTaskClick={setSelectedTaskId}
                />
              ))}
            </div>
          </SortableContext>
        </div>

        {/* Create Task Modal */}
        <TaskModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={task =>
            addTask({ ...task, projectId })
          }
          columns={project.columns}
          assignees={assignees}
        />

        {/* Task Details Panel */}
        {selectedTaskId && (
          <TaskDetailsPanel
            taskId={selectedTaskId}
            onClose={() => setSelectedTaskId(null)}
          />
        )}
      </div>
    </DndContext>
  );
}

export default BoardPage;
