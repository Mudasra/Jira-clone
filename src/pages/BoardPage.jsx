import { useParams } from 'react-router-dom';
import { useState } from 'react';

import useBoardData from '../store/slices/useBoardData'
import BoardFilters from './board/BoardFilters';
import BoardCanvas from './board/BoardCanvas';
import BoardOverlays from './board/BoardOverlays';
import BoardHeader from './board/BoardHeader';

function BoardPage() {
  const { projectId } = useParams();

  const [filters, setFilters] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const { project, tasks } = useBoardData(projectId, filters);

  if (!project) return <p className="p-4">Project not found</p>;

  const assignees = ['Alice', 'Bob', 'Charlie'];

  return (
    <div className="flex flex-col h-full">
      <BoardHeader
        title={`${project.name} Board`}
        onNewTask={() => setModalOpen(true)}
      />

      <BoardFilters
        assignees={assignees}
        onChange={setFilters}
      />

      <BoardCanvas
  project={project}
  tasks={tasks}
  onTaskClick={setSelectedTaskId} // clicking any card opens details
/>
<BoardOverlays
  projectId={projectId}
  columns={project.columns}
  assignees={assignees}
  modalOpen={modalOpen}
  closeModal={() => setModalOpen(false)}
  selectedTaskId={selectedTaskId}
  closeDetails={() => setSelectedTaskId(null)}
/>
    </div>
  );
}

export default BoardPage;
