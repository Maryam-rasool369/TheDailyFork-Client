import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useVerifySession } from "../../hooks/useVerifySession";
import LoadingState from "../admin/LoadingState";

const AdminRoute = () => {
    const { token, user } = useAuthStore();
    const { isChecking } = useVerifySession();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (user?.roleId !== 2) {
        return <Navigate to="/" replace />;
    }

    // Don't show admin pages until the server has confirmed the token is still valid
    if (isChecking) {
        return <LoadingState label="Checking your session..." />;
    }

    return <Outlet />;
};

export default AdminRoute;
