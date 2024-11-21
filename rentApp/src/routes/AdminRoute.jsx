import { useEffect, useState } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

function AdminRoute() {  

    const { isAdmin,loading} = useOutletContext();

    if (loading) {
        return <div>Loading...</div>;
    }
    return isAdmin ? <Outlet /> : <Navigate to='/favourites' />; 
}

export default AdminRoute;

