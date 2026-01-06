import { useState } from 'react';

function ColumnHeader({ column, onRename, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(column.title);

  return (
    <div className="flex justify-between items-center">
      {editing ? (
        <input
          className="input input-sm"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={() => {
            onRename(title);
            setEditing(false);
          }}
          autoFocus
        />
      ) : (
        <h3
          className="font-bold cursor-pointer"
          onDoubleClick={() => setEditing(true)}
        >
          {column.title}
        </h3>
      )}

      <button
        className="btn btn-xs btn-ghost text-error"
        onClick={onDelete}
      >
        ✕
      </button>
    </div>
  );
}

export default ColumnHeader;
