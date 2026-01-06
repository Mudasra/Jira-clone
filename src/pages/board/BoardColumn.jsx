import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import ColumnHeader from './ColumnHeader';
import useAppStore from '../../store/useAppStore';

function BoardColumn({ projectId, column, tasks, onTaskClick }) {
  const renameColumn = useAppStore(s => s.renameColumn);
  const deleteColumn = useAppStore(s => s.deleteColumn);

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: {
      type: 'column',
      columnId: column.id
    }
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-base-200 rounded p-2 flex-shrink-0 w-64"
    >
      <ColumnHeader
        column={column}
        onRename={title =>
          renameColumn({
            projectId,
            columnId: column.id,
            title
          })
        }
        onDelete={() =>
          deleteColumn({
            projectId,
            columnId: column.id
          })
        }
      />

      <SortableContext
        items={tasks.map(t => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2 mt-2">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task.id)}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default BoardColumn;
