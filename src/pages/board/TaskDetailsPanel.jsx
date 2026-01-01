import useAppStore from "../../store/useAppStore";

function TaskDetailsPanel({ taskId, onClose }) {
  const task = useAppStore(s => s.tasks.find(t => t.id === taskId));

  if (!task) return null;

  return (
    <>
      {/* Blurred overlay */}
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40"
        onClick={onClose}
      ></div>

      {/* Centered Card */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-base-100 rounded-xl shadow-xl w-full max-w-md p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h3 className="text-xl font-bold">{task.title}</h3>
            <button className="btn btn-ghost btn-sm" onClick={onClose}>X</button>
          </div>

          <div className="flex flex-col gap-3">
            <p><strong>Description:</strong></p>
            <p className="whitespace-pre-wrap">{task.description || '-'}</p>

            <div className="flex flex-wrap gap-2">
              <span className="badge badge-outline">Priority: {task.priority}</span>
              <span className="badge badge-outline">Type: {task.type}</span>
              <span className="badge badge-outline">Column: {task.column}</span>
              <span className="badge badge-outline">Assignee: {task.assignee || 'Unassigned'}</span>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Subtasks</h4>
              <ul className="list-disc pl-5">
                {task.subtasks?.length
                  ? task.subtasks.map(st => <li key={st.id}>{st.title}</li>)
                  : <li>No subtasks</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetailsPanel;
