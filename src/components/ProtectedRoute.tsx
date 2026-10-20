import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// Replace this with your actual auth hook/context (e.g., from src/context or src/features/auth)
// import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  /** Optional: fallback route if unauthenticated (defaults to "/login") */
  redirectTo?: string;
  /** Optional: support role-based route access (e.g., ['admin', 'organizer']) */
  allowedRoles?: string[];
  /** Optional: direct children if not using nested route <Outlet /> */
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectTo = '/login',
  allowedRoles,
  children,
}) => {
  const location = useLocation();

  // --- Mock Auth (replace with your hook) ---
  // Example: const { user, isAuthenticated, isLoading } = useAuth();
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const isLoading = false;
  const userRole = 'attendee'; // Example role
  // ------------------------------------------

  // 1. Prevent redirection flashes while checking session/token
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  // 2. Redirect unauthenticated users and preserve their target URL
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // 3. Optional: Role authorization check
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. Render children if passed directly, otherwise render nested routes via Outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;