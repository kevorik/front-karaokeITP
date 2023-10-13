import React from "react";

export const AuthImagelow = (props: any): JSX.Element => {
  const { path } = props;

  return (
    <div>
      <img style={{ width: "500px" }} src={path} alt="альтернативный текст" />
    </div>
  );
};

export default AuthImagelow;
