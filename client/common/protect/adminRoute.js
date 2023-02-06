import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkAuth } from '../../authentication/checkAuth'
import { getToken } from '../sessions/common';

// handle the private routes
function AdminRoute({ component: Component, ...rest }) {
    // const [isAdmin, setAdmin] = useState();

    // useEffect(() => {
    //     checkAuth.then(setAdmin)
    // })
    // console.log(isAdmin);
    return (
        <Route
            {...rest}
            render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}

export default AdminRoute;