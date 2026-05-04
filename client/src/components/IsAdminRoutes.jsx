import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function IsAdminRoutes() {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to="/login" />;
}

export default IsAdminRoutes;