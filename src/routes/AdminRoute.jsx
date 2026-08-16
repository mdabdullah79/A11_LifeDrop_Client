import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Loading';
import useRole from '../hooks/useRole';
import Forbidden from '../Components/Forbidden';

const AdminRoute = ({children}) => {
    const {user,loading} = useAuth();
    const {role,isLoading} = useRole();

    if(loading || isLoading){
        return <Loading></Loading>
    }
    if(role.role !=='Admin'){
        return <Forbidden></Forbidden>
    }
    return children
};

export default AdminRoute;