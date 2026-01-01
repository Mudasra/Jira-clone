import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

function BoardColumn({ column, tasks = [], onTaskClick }) {

   const { setNodeRef } = useDroppable({
    id: column,
    data: { type: 'column', column }
  });

  return (
    <div className="bg-base-200 rounded p-2 flex flex-col min-w-[250px]">
      <h3 className="font-semibold mb-2">{column}</h3>
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {tasks.length
            ? tasks.map(task => <TaskCard key={task.id} task={task} onClick={onTaskClick} />)
            : <p className="text-sm text-gray-500">No tasks</p>}
        </div>
      </SortableContext>
      <div ref={setNodeRef} className="w-64 bg-base-200 rounded p-3">
      <h3 className="font-bold mb-2">{column}</h3>

      <div className="flex flex-col gap-2">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
    </div>
  );
}

export default BoardColumn;
