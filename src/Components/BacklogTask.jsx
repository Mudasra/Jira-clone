function BacklogTask({ task }) {
  return (
    <div className="bg-base-100 p-3 rounded shadow hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{task.title}</h3>
        <span className="badge badge-outline">{task.priority}</span>
      </div>

      <p className="text-sm opacity-70 mt-1">
        {task.description || 'No description'}
      </p>
    </div>
  );
}

export default BacklogTask;
