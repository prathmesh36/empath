import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        // user is not authenticated
        return <Navigate to="/sign-in" />;
    }
    return children;
};