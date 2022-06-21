import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/User/userSlice';

type Props = {
  redirectPath: string;
  children?: ReactElement;
};

export default function PrivateRoute({ children, redirectPath }: Props) {
  const {
    data: { accessToken },
  } = useAppSelector(selectUser);

  if (!accessToken) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
}
