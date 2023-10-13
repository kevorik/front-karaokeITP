import { Navigate, Outlet } from "react-router-dom";
import { selectAccessRole, useIsAuthorized } from "./features/auth/auth.store";
import { useAppSelector } from "./store/hooks";
export const AuthorizationRoute = (): JSX.Element => {
  const isAuthorized = useIsAuthorized();

  return isAuthorized ? <Outlet /> : <Navigate to={"/"} />;
};
