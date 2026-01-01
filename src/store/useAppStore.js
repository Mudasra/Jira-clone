import { create } from 'zustand';
import { createProjectSlice } from './slices/projectSlice';
import { createTaskSlice } from './slices/taskSlice';

import { createUISlice } from './slices/uiSlice';

const useAppStore = create((set, get) => ({
  ...createProjectSlice(set, get),
  ...createUISlice(set, get),
    ...createTaskSlice(set, get),

    moveTaskToColumn: ({ taskId, column }) =>
  set(state => {
    const tasks = [...state.tasks];
    const task = tasks.find(t => t.id === taskId);
    if (!task) return state;

    task.column = column;

    // Optional: ordering logic later
    return { tasks };
  }),

}));

export default useAppStore;
