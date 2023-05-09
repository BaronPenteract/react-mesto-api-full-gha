import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, loggedIn, ...props }) => {
  return <>{loggedIn ? <Component {...props} /> : <Navigate to="/sing-up" replace />}</>;
};

export default ProtectedRoute;
