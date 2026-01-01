import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import ProjectListPage from '../pages/ProjectListPage';
import SettingsPage from '../pages/SettingsPage';
import BoardPage from '../pages/BoardPage';
import BacklogPage from '../pages/BacklogPage';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<ProjectListPage />} />
        <Route path="/projects/:projectId/board" element={<BoardPage />} />
        <Route path="/projects/:projectId/backlog" element={<BacklogPage />} />
        <Route path="/projects/:projectId/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
