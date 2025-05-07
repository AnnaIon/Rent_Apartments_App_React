import { useEffect, useState } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

/**
 * AdminRoute is a protected route wrapper that ensures only admin users
 * can access the routes nested under it. If the user is not an admin,
 * they are redirected. It also handles a loading state during validation.
 */
function AdminRoute() {  
    // Get shared context from the parent route (usually App or Layout)
    const { isAdmin, loading } = useOutletContext();

    // Show loading screen while user role is being verified
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render child routes if admin, otherwise redirect to /favourites
    return isAdmin ? <Outlet /> : <Navigate to='/favourites' />; 
}

export default AdminRoute;
