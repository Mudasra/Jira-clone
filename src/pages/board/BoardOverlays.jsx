// import TaskModal from '../TaskModal';
// import TaskDetailsPanel from '../TaskDetailsPanel';
import useAppStore from '../../store/useAppStore';

function BoardOverlays({
  projectId,
  columns,
  assignees,
  modalOpen,
  closeModal,
  selectedTaskId,
  closeDetails
}) {
  const addTask = useAppStore(s => s.addTask);

  return (
    <>
      <TaskModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={task => addTask({ ...task, projectId })}
        columns={columns}
        assignees={assignees}
      />

      <TaskDetailsPanel
        taskId={selectedTaskId}
        onClose={closeDetails}
      />
    </>
  );
}

export default BoardOverlays;
