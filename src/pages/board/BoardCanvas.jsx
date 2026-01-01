import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import BoardColumn from './BoardColumn';
import useAppStore from '../../store/useAppStore';

function BoardCanvas({ project, tasks, onTaskClick }) {
  const reorderTasks = useAppStore(s => s.reorderTasks);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = event => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    reorderTasks({
      taskId: active.id,
      toColumn: over.data.current.column,
      toIndex: over.data.current.index
    });
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={project.columns} strategy={horizontalListSortingStrategy}>
        <div className="flex gap-4 p-4 min-h-[70vh] overflow-x-auto">
          {project.columns.map(col => (
            <BoardColumn
              key={col}
              column={col}
              projectId={project.id}
              tasks={tasks.filter(t => t.column === col)}
              onTaskClick={onTaskClick}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default BoardCanvas;
