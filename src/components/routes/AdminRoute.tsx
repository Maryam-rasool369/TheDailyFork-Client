import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const AdminRoute = () => {
    const { token, user } = useAuthStore();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;