import { useMemo } from 'react';
import useAppStore from '../useAppStore';

export default function useBoardData(projectId, filters) {
  const project = useAppStore(s =>
    s.projects.find(p => p.id === projectId)
  );

  const allTasks = useAppStore(s => s.tasks);

  const projectTasks = useMemo(() => {
    return allTasks.filter(t => t.projectId === projectId);
  }, [allTasks, projectId]);

  const filteredTasks = useMemo(() => {
    if (!filters) return projectTasks;

    const { keyword, priority, type, assignee } = filters;

    return projectTasks.filter(t => {
      const matchKeyword =
        !keyword ||
        t.title.toLowerCase().includes(keyword.toLowerCase()) ||
        t.description?.toLowerCase().includes(keyword.toLowerCase());

      const matchPriority = !priority || t.priority === priority;
      const matchType = !type || t.type === type;
      const matchAssignee = !assignee || t.assignee === assignee;

      return matchKeyword && matchPriority && matchType && matchAssignee;
    });
  }, [projectTasks, filters]);

  return {
    project,
    tasks: filteredTasks
  };
}
