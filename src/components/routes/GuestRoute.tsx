import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const GuestRoute = () => {
    const token = useAuthStore((s) => s.token);

    if (token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default GuestRoute;