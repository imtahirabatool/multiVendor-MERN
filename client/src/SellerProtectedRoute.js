import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isSeller, children }) => {
  if (!isSeller) {
    return <Navigate to={`/`} replace />;
  }

  return children;
};

export default ProtectedRoute;
