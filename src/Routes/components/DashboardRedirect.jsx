import { Navigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const DashboardRedirect = () => {
  const [isAdmin, isLoading] = useAdmin();

  if (isLoading) {
    return <p className="p-8">Loading...</p>;
  }

  return isAdmin ? (
    <Navigate to="adminHome" replace />
  ) : (
    <Navigate to="userHome" replace />
  );
};

export default DashboardRedirect;
