# Jira Clone (Frontend Only)

## Tech Stack

- React 18
- Vite
- JavaScript
- Tailwind CSS + DaisyUI
- Zustand (state management)
- React Router

## Architecture Overview

### State Management

- Zustand slices:
  - projectSlice: manages projects CRUD

  - uiSlice: manages theme

- State persisted manually via localStorage

### Routing

- `/` → Project List
- `/projects/:id/board` → Kanban Board
- `/projects/:id/backlog` → Backlog
- `/projects/:id/settings` → Project Settings

### Components

- `ProjectCard` → displays project info with edit/delete actions
- `ProjectModal` → reusable modal for creating or editing projects

### Styling

- Tailwind CSS for utilities and layout

- DaisyUI for components and themes

- Responsive grid for project list

## Kanban Board

- Columns dynamically loaded from project state

- Tasks normalized in Zustand store:
  - id, title, priority, type, assignee, column, projectId

- TaskModal handles creation and editing:
  - title, priority, type, assignee, column assignment

- Tasks persist to localStorage

- BoardColumn renders tasks per column

- Responsive and themeable via Tailwind + DaisyUI

- Implemented sortable TaskCards with useSortable

- Added reorderTasks to Zustand task slice for state updates

- BoardPage handles onDragEnd to reorder tasks

- Tasks persist to localStorage

- Handles cross-column moves and vertical reordering

- Add Project List page with DaisyUI cards

- Add reusable ProjectModal for create/edit

- Wire CRUD actions to Zustand store with persistence

- Add responsive grid layout for projects

- Render Kanban board columns dynamically from project state

- Add BoardColumn and TaskCard components

- Integrate dnd-kit for future drag-and-drop

- Ensure responsive layout with Tailwind + DaisyUI

- Add normalized task slice to Zustand store

- Implement TaskModal for create/edit

- Update BoardColumn to render tasks filtered by column

- Maintain persistence via localStorage

- Prepare UI for drag-and-drop

- Implemented sortable TaskCards with useSortable

- Added reorderTasks to Zustand task slice for state updates

- BoardPage handles onDragEnd to reorder tasks

- Tasks persist to localStorage

- Handles cross-column moves and vertical reordering

- New TaskDetailsPanel component for task details

- Supports editing task properties, subtasks, comments

- Integrated with Zustand for persistence

- TaskCard now opens panel on click

- Fully responsive and scrollable panel for many subtasks/comments

- BacklogPage lists all unassigned tasks for a project

- Tasks are reorderable with DnD-Kit

- Drag to board columns possible
- 
- Uses Zustand for state persistence

- New TaskFilter component for search and filtering tasks

- Integrated into BoardPage and BacklogPage

- Filters combine and update tasks in real-time

- Compatible with DnD-Kit drag-and-drop

- Adds a backlog page that lists tasks with no assigned column.

- Establishes column === null as the source of truth for backlog state.

- Prepares groundwork for drag-and-drop from backlog to board.

- Implements cross-context drag-and-drop allowing backlog tasks
(column === null) to be assigned to board columns.

- State transitions are centralized in the Zustand store.

## Development

```bash
npm install
npm run dev
```
