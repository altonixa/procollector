import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
   const { isAuthenticated, isLoading, user } = useAuth();

   if (isLoading) {
      return (
         <div className="flex items-center justify-center h-screen bg-brand-dustGold">
            <div className="text-center">
               <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-brand-green border-t-brand-dark"></div>
               <p className="mt-4 text-brand-dark font-bold">Loading...</p>
            </div>
         </div>
      );
   }

   // Require authentication
   if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
   }

  // Role-based access control for production routes
  if (requiredRole && user) {
    // Allow managers to access organization routes
    const allowedRoles = requiredRole === 'organization' ? ['organization', 'manager'] : [requiredRole];
    if (!allowedRoles.includes(user.role)) {
      // Redirect to their appropriate dashboard
      const roleRoutes: { [key: string]: string } = {
        'admin': '/admin',
        'organization': '/organization',
        'manager': '/manager',
        'collector': '/collector',
        'client': '/client',
        'auditor': '/auditor'
      };
      return <Navigate to={roleRoutes[user.role] || '/dashboard'} replace />;
    }
  }

  return <>{children}</>;
}
