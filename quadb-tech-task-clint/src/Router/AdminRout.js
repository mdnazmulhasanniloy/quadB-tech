import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';  
import Spanner from './../Pages/Shared/Spanner/Spanner'; 
import { AuthContext } from '../Provider/AuthProvider';
import useAdmin from './../Hooks/useAdmin';


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    const location = useLocation();


    if (loading || isAdminLoading) {
        return <Spanner />
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;