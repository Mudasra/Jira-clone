import { useDraggable } from '@dnd-kit/core';

function BacklogTask({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { from: 'backlog' }
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-base-100 p-3 rounded shadow cursor-grab"
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm opacity-70">{task.description || 'No description'}</p>
    </div>
  );
}

export default BacklogTask;
