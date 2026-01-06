import { create } from 'zustand';
import { createProjectSlice } from './slices/projectSlice';
import { createTaskSlice } from './slices/taskSlice';

import { createUISlice } from './slices/uiSlice';

const useAppStore = create((set, get) => ({
  ...createProjectSlice(set, get),
  ...createUISlice(set, get),
  ...createTaskSlice(set, get),

  moveTaskToColumn: ({ taskId, column }) =>
    set((state) => {
      const tasks = [...state.tasks];
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return state;

      task.column = column;

      // Optional: ordering logic later
      return { tasks };
    }),

    reorderColumns: ({ projectId, activeId, overId }) =>
  set(state => {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return state;

    const cols = [...project.columns];
    const from = cols.findIndex(c => c.id === activeId);
    const to = cols.findIndex(c => c.id === overId);

    const [moved] = cols.splice(from, 1);
    cols.splice(to, 0, moved);

    cols.forEach((c, i) => (c.order = i));
    project.columns = cols;

    return { projects: [...state.projects] };
  }),

  moveTask: ({ taskId, toColumn, toIndex }) =>
  set(state => {
    const tasks = [...state.tasks];
    const task = tasks.find(t => t.id === taskId);
    if (!task) return state;

    task.column = toColumn;

    const columnTasks = tasks
      .filter(t => t.column === toColumn && t.id !== taskId)
      .sort((a, b) => a.order - b.order);

    columnTasks.splice(toIndex, 0, task);
    columnTasks.forEach((t, i) => (t.order = i));

    return { tasks };
  }),

  addColumn: ({ projectId, title }) =>
  set(state => {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return state;

    project.columns.push({
      id: crypto.randomUUID(),
      title,
      order: project.columns.length
    });

    return { projects: [...state.projects] };
  }),

  renameColumn: ({ projectId, columnId, title }) =>
  set(state => {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return state;

    const col = project.columns.find(c => c.id === columnId);
    if (col) col.title = title;

    return { projects: [...state.projects] };
  }),

  deleteColumn: ({ projectId, columnId }) =>
  set(state => {
    const project = state.projects.find(p => p.id === projectId);
    if (!project) return state;

    // remove column
    project.columns = project.columns.filter(c => c.id !== columnId);

    // move tasks to backlog (safe fallback)
    state.tasks.forEach(t => {
      if (t.column === columnId) {
        t.column = null;
        t.order = 0;
      }
    });

    // reindex columns
    project.columns.forEach((c, i) => (c.order = i));

    return { projects: [...state.projects], tasks: [...state.tasks] };
  }),


}));

export default useAppStore;
