import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import MainLayout from './components/layout/MainLayout';
import DashboardPage from './components/dashboard/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import UsersPage from './components/users/UsersPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { RequestListPage } from './pages/RequestListPage';
import VolunteersPage from './components/dashboard/VolunteersPage';
import SettingsPage from './components/dashboard/SettingsPage';
import VolunteerTasksPage from './components/dashboard/VolunteerTasksPage';
import VolunteerRequestsPage from './components/dashboard/VolunteerRequestsPage';
import HelpPage from './components/dashboard/HelpPage';
import OrgRequestsPage from './components/dashboard/OrgRequestsPage';
import TeamPage from './components/dashboard/TeamPage';
import OrgSettingsPage from './components/dashboard/OrgSettingsPage';
import RequestSubmissionPage from './pages/RequestSubmissionPage';
import HomePage from './pages/HomePage';
import LiveActivityPage from './pages/LiveActivityPage';
import './App.css';

// Protect routes - redirect to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function AppRouter() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/live-activity" element={<LiveActivityPage />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />}
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <MainLayout>
              <NotificationsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Core pages */}
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <MainLayout>
              <UsersPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/requests"
        element={
          <ProtectedRoute>
            <MainLayout>
              <RequestListPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/volunteers"
        element={
          <ProtectedRoute>
            <MainLayout>
              <VolunteersPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AnalyticsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <MainLayout>
              <SettingsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Volunteer routes */}
      <Route
        path="/volunteer/tasks"
        element={
          <ProtectedRoute>
            <MainLayout>
              <VolunteerTasksPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/volunteer/requests"
        element={
          <ProtectedRoute>
            <MainLayout>
              <VolunteerRequestsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/volunteer/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/volunteer/help"
        element={
          <ProtectedRoute>
            <MainLayout>
              <HelpPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Organization staff routes */}
      <Route
        path="/org/submit-request"
        element={
          <ProtectedRoute>
            <MainLayout>
              <RequestSubmissionPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/org/requests"
        element={
          <ProtectedRoute>
            <MainLayout>
              <OrgRequestsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/org/team"
        element={
          <ProtectedRoute>
            <MainLayout>
              <TeamPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/org/settings"
        element={
          <ProtectedRoute>
            <MainLayout>
              <OrgSettingsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
