import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useVerifySession } from "../../hooks/useVerifySession";
import LoadingState from "../admin/LoadingState";

const PrivateRoute = () => {
    const token = useAuthStore((s) => s.token);
    const location = useLocation();
    const { isChecking } = useVerifySession();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Don't show private pages until the server has confirmed the token is still valid
    if (isChecking) {
        return <LoadingState label="Checking your session..." />;
    }

    return <Outlet />;
};

export default PrivateRoute;
