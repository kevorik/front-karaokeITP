import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";

const WIthNavBar = (props: any) => {
  const { children } = props;

  return (
    <>
      <main>
        <Navbar>
          <Outlet />
        </Navbar>
      </main>
    </>
  );
};

export default WIthNavBar;
