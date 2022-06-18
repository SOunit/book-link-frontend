import { FC } from 'react';
import { Redirect, Route } from 'react-router';
import { useAuthStorage } from '../../../../services';

type ProtectedRouteProps = {
  component: FC<any>;
  path: string;
  exact?: any;
  socket?: any;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const authStorage = useAuthStorage();
  const Component = props.component;

  return (
    <Route path={props.path}>
      {authStorage.isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )}
    </Route>
  );
};
