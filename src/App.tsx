
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AppLayout } from './components/layout/AppLayout';

import { DashboardPage } from './pages/DashboardPage';
import { CampusFeedPage } from './pages/CampusFeedPage';
import { DiscoverStudentsPage } from './pages/DiscoverStudentsPage';
import { ServicesPage } from './pages/ServicesPage';
import { RidesPage } from './pages/RidesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';


function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('campus_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


export function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected application */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="feed" element={<CampusFeedPage />} />
          <Route path="students" element={<DiscoverStudentsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="rides" element={<RidesPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
