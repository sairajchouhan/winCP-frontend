import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
