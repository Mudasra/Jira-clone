function BoardHeader({ title, onNewTask }) {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h2 className="text-2xl font-bold">{title}</h2>
      <button className="btn btn-primary" onClick={onNewTask}>
        + New Task
      </button>
    </div>
  );
}

export default BoardHeader;
