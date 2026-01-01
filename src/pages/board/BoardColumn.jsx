import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

function BoardColumn({ column , tasks, onTaskClick }) {
  return (
    <div className="bg-base-200 rounded p-2 flex-shrink-0 w-64">
      <h3 className="font-semibold mb-2">{column}</h3>

      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task.id)} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default BoardColumn;
