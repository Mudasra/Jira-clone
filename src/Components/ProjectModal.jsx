import { useState, useEffect } from 'react';

function ProjectModal({ isOpen, onClose, onSubmit, defaultName = '' }) {
  const [name, setName] = useState(defaultName);

  useEffect(() => {
    setName(defaultName);
  }, [defaultName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-40 flex items-center justify-center">
      <div className="bg-base-100 p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">
          {defaultName ? 'Edit Project' : 'New Project'}
        </h2>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full mb-4"
        />
        <div className="flex justify-end gap-2">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              if (!name.trim()) return;
              onSubmit(name.trim());
              onClose();
            }}
          >
            {defaultName ? 'Save' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
