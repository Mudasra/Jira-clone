import { useMemo } from 'react';
import useAppStore from '../store/useAppStore';
import BacklogTask from '../components/BacklogTask';

function BacklogPage() {
  const tasks = useAppStore(s => s.tasks);

  const backlogTasks = useMemo(
    () => tasks.filter(t => t.column === null),
    [tasks]
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Backlog</h1>

      {backlogTasks.length === 0 && (
        <p className="text-sm opacity-70">No tasks in backlog</p>
      )}

      <div className="flex flex-col gap-2">
        {backlogTasks.map(task => (
          <BacklogTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default BacklogPage;
