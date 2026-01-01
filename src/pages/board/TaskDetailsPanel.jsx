import useAppStore from "../../store/useAppStore";

function TaskDetailsPanel({ taskId, onClose }) {
  const task = useAppStore(s => s.tasks.find(t => t.id === taskId));

  if (!task) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-base-200 shadow-lg p-4 z-50 overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{task.title}</h3>
        <button className="btn btn-sm btn-ghost" onClick={onClose}>X</button>
      </div>

      <p className="mb-2"><strong>Description:</strong> {task.description || '-'}</p>
      <p className="mb-2"><strong>Priority:</strong> {task.priority}</p>
      <p className="mb-2"><strong>Type:</strong> {task.type}</p>
      <p className="mb-2"><strong>Assignee:</strong> {task.assignee || 'Unassigned'}</p>
      <p className="mb-2"><strong>Column:</strong> {task.column}</p>
    </div>
  );
}

export default TaskDetailsPanel;
