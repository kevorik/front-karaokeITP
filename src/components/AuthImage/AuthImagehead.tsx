import React from "react";

export const AuthImagehead = (props: any): JSX.Element => {
  const { path } = props;

  return (
    <div>
      <img style={{ width: "700px" }} src={path} alt="альтернативный текст" />
    </div>
  );
};

export default AuthImagehead;

{
  /* <Routes>
        {/* <Route path="/" element={<Navbar />} /> *
        <Route path="/users" element={<Users />}/>
        <Route path="/roles" element={<Roles />} />
      </Routes> */
}
