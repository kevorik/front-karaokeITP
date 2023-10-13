import React, { useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  selectAccessRole,
  useAccessRole,
  useIsAuthorized,
} from "./features/auth/auth.store";
import { rolesApi } from "./features/roles/roles.store";
import { useAppSelector } from "./store/hooks";
export const ProtectedRoute = (): JSX.Element => {
  const isAuthorized = useIsAuthorized();
  const location = useLocation();
  const role = useAppSelector(selectAccessRole);

  let currentPage = location.pathname.slice(1, 10000);

  if (role.access_page.indexOf(currentPage) == -1 && currentPage !== "main") {
    return <Navigate to={"/main"} />;
  } else if (!isAuthorized) {
    return <Navigate to={"/"} />;
  } else {
    return <Outlet />;
  }

  // return <Outlet />;
};
