// import { useParams } from 'react-router-dom';
// import { useMemo } from 'react';
// import useAppStore from '../store/useAppStore';
// import TaskCard from '../components/TaskCard';
// import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
// import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

// function BacklogPage() {
//   const { projectId } = useParams();
//   const project = useAppStore(s => s.projects.find(p => p.id === projectId));
//   const allTasks = useAppStore(s => s.tasks);
//   const reorderTasks = useAppStore(s => s.reorderTasks);

//   const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

//   const backlogTasks = useMemo(
//     () => allTasks.filter(t => t.projectId === projectId && !t.column),
//     [allTasks, projectId]
//   );

//   const handleDragEnd = ({ active, over }) => {
//     if (!over) return;
//     const taskId = active.id;
//     const overTaskId = over.id;

//     if (taskId === overTaskId) return;

//     const toIndex = backlogTasks.findIndex(t => t.id === overTaskId);
//     reorderTasks({ taskId, toColumn: null, toIndex });
//   };

//   if (!project) return <p className="p-4">Project not found</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">{project.name} Backlog</h2>
//       <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <SortableContext items={backlogTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
//           <div className="flex flex-col gap-2">
//             {backlogTasks.length
//               ? backlogTasks.map(task => <TaskCard key={task.id} task={task} onClick={() => {}} />)
//               : <p className="text-gray-500">No tasks in backlog</p>}
//           </div>
//         </SortableContext>
//       </DndContext>
//       <p className="mt-4 text-sm text-gray-500">
//         Drag tasks from backlog to board to assign them to a column.
//       </p>
//     </div>
//   );
// }

// export default BacklogPage;











import { useMemo } from 'react';
import useAppStore from '../store/useAppStore';
import BacklogTask from '../components/BacklogTask';

function BacklogPage() {
  const tasks = useAppStore(s => s.tasks);

  const backlogTasks = useMemo(
    () => tasks.filter(t => t.column === null),
    [tasks]
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Backlog</h1>

      {backlogTasks.length === 0 && (
        <p className="text-sm opacity-70">No tasks in backlog</p>
      )}

      <div className="flex flex-col gap-2">
        {backlogTasks.map(task => (
          <BacklogTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default BacklogPage;
