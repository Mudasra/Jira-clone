import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function TaskCard({ task, onClick }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id, data: { column: task.column } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const priorityColor = {
    Low: 'badge-success',
    Medium: 'badge-warning',
    High: 'badge-error'
  }[task.priority || 'Low'];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-base-100 p-2 rounded shadow cursor-pointer hover:shadow-lg"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-1">
        <span className={`badge ${priorityColor} text-sm`}>{task.priority}</span>
        <span className="text-xs">{task.type}</span>
      </div>
      <h4 className="font-semibold">{task.title}</h4>
      {task.assignee && <p className="text-xs text-muted">Assigned to: {task.assignee}</p>}
    </div>
  );
}

export default TaskCard;
