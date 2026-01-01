import { useState, useEffect } from 'react';

function TaskModal({ isOpen, onClose, onSubmit, columns, assignees, task }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [type, setType] = useState('Task');
  const [assignee, setAssignee] = useState('');
  const [column, setColumn] = useState(columns[0] || '');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority || 'Low');
      setType(task.type || 'Task');
      setAssignee(task.assignee || '');
      setColumn(task.column || columns[0]);
    } else {
      setTitle('');
      setDescription('');
      setPriority('Low');
      setType('Task');
      setAssignee('');
      setColumn(columns[0] || '');
    }
  }, [task, columns]);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ title, description, priority, type, assignee, column, id: task?.id });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40 flex items-center justify-center">
      <form
        className="bg-base-100 p-6 rounded shadow-md w-96 flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <h3 className="text-lg font-bold mb-2">{task ? 'Edit Task' : 'New Task'}</h3>

        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <select className="select select-bordered" value={priority} onChange={e => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select className="select select-bordered" value={type} onChange={e => setType(e.target.value)}>
          <option>Task</option>
          <option>Feature</option>
          <option>Bug</option>
        </select>

        <select className="select select-bordered" value={assignee} onChange={e => setAssignee(e.target.value)}>
          <option value="">Unassigned</option>
          {assignees.map(a => <option key={a}>{a}</option>)}
        </select>

        <select className="select select-bordered" value={column} onChange={e => setColumn(e.target.value)}>
          {columns.map(c => <option key={c}>{c}</option>)}
        </select>

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">{task ? 'Save' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
}

export default TaskModal;
