import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

import AuthProvider, { AuthCtx } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/LoginPage';
import CommunityList from './pages/CommunityList';
import CommunityForm from './pages/CommunityForm';
import CommunityEdit from './pages/CommunityEdit';

/* ───────── helper that decides where “/” should go ───────── */
function RootRedirect() {
  const { user } = React.useContext(AuthCtx);
  return <Navigate to={user ? '/communities' : '/login'} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* default root */}
          <Route path="/" element={<RootRedirect />} />

          {/* public */}
          <Route path="/login" element={<Login />} />

          {/* protected list */}
          <Route
            path="/communities"
            element={
              <PrivateRoute>
                <CommunityList />
              </PrivateRoute>
            }
          />

          {/* protected new-community form */}
          <Route
            path="/community/new"
            element={
              <PrivateRoute>
                <CommunityForm />
              </PrivateRoute>
            }
          />
          <Route
          path="/community/:id/edit"
        element={
            <PrivateRoute>
            <CommunityEdit />
            </PrivateRoute>
            }
          />
          {/* catch-all → go to “/” so RootRedirect handles it */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
