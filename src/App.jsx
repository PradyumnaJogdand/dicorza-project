import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import BrandDashboard from './pages/BrandDashboard';
import CreatorDashboard from './pages/CreatorDashboard';
import ApplicationsView from './pages/ApplicationsView';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProjectProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/brand-dashboard"
              element={
                <ProtectedRoute requiredRole="Brand">
                  <BrandDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/brand-dashboard/applications/:projectId"
              element={
                <ProtectedRoute requiredRole="Brand">
                  <ApplicationsView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/creator-dashboard"
              element={
                <ProtectedRoute requiredRole="Creator">
                  <CreatorDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
