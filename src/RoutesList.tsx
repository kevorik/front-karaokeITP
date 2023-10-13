import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import AuthPage from "./features/auth/auth.page";
import Events from "./features/events/pages/events.page";
import Genres from "./features/genres/pages/genres.page";
import MainPage from "./features/main/main.page";
import Playlists from "./features/playlists/pages/playlists.page";

import Roles from "./features/roles/pages/roles.page";
import UpdateRole from "./features/roles/pages/UpdateRolePage";
import Sounds from "./features/sounds/pages/sounds.page";
import UpdateUsers from "./features/users/pages/update-users.page";
import Users from "./features/users/pages/users.page";
import { ProtectedRoute } from "./AccessRoute";
import WIthNavBar from "./withNavBar";
import { AuthorizationRoute } from "./AuthorizationRoute";
import RegistrationPage from "./features/registration/registration.page";

const WithOutNavBar = () => {
  return <Outlet />;
};

export const RoutesList = (props: any): JSX.Element => {
  const { children } = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WithOutNavBar />}>
          <Route path="/" element={<AuthPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Route>
        <Route element={<WIthNavBar children={children} />}>
          <Route path="/main" element={<ProtectedRoute />}>
            <Route path="/main" element={<MainPage />} />
          </Route>
          <Route path="/users" element={<ProtectedRoute />}>
            <Route path="/users" element={<Users />} />
          </Route>
          <Route path="/roles" element={<ProtectedRoute />}>
            <Route path="/roles" element={<Roles />} />
          </Route>
          <Route path="/sounds" element={<ProtectedRoute />}>
            <Route path="/sounds" element={<Sounds />} />
          </Route>
          <Route path="/playlists" element={<ProtectedRoute />}>
            <Route path="/playlists" element={<Playlists />} />
          </Route>
          <Route path="/events" element={<ProtectedRoute />}>
            <Route path="/events" element={<Events />} />
          </Route>
          <Route path="/genres" element={<ProtectedRoute />}>
            <Route path="/genres" element={<Genres />} />
          </Route>
          <Route path="/update" element={<AuthorizationRoute />}>
            <Route path="/update" element={<UpdateUsers />} />
          </Route>
          <Route path="/users/:id" element={<AuthorizationRoute />}>
            <Route path="/users/:id" element={<UpdateUsers />} />
          </Route>
          <Route path="/update" element={<AuthorizationRoute />}>
            <Route path="/update" element={<UpdateRole />} />
          </Route>
          <Route path="/roles/:id" element={<AuthorizationRoute />}>
            <Route path="/roles/:id" element={<UpdateRole />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
