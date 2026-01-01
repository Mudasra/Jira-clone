function BoardFilters({ assignees, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      <input
        className="input input-bordered"
        placeholder="Search..."
        onChange={e => onChange(f => ({ ...f, keyword: e.target.value }))}
      />

      <select
        className="select select-bordered"
        onChange={e => onChange(f => ({ ...f, priority: e.target.value }))}
      >
        <option value="">All Priorities</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select
        className="select select-bordered"
        onChange={e => onChange(f => ({ ...f, type: e.target.value }))}
      >
        <option value="">All Types</option>
        <option>Bug</option>
        <option>Feature</option>
        <option>Task</option>
      </select>

      <select
        className="select select-bordered"
        onChange={e => onChange(f => ({ ...f, assignee: e.target.value }))}
      >
        <option value="">All Assignees</option>
        {assignees.map(a => (
          <option key={a}>{a}</option>
        ))}
      </select>
    </div>
  );
}

export default BoardFilters;
