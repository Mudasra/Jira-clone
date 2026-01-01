function TaskCard({ task, onClick }) {
  const priorityColor = {
    Low: 'badge-success',
    Medium: 'badge-warning',
    High: 'badge-error'
  }[task.priority || 'Low'];

  return (
    <div
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
