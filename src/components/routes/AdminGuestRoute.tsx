import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const AdminGuestRoute = () => {
    const { token, user } = useAuthStore();

    if (token && user?.role === "ADMIN") {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default AdminGuestRoute;
