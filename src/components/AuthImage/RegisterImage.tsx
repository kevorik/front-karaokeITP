import React from "react";

export const RegisterImage = (props: any): JSX.Element => {
  const { path } = props;

  return (
    <div>
      <img style={{ width: "1000px" }} src={path} alt="альтернативный текст" />
    </div>
  );
};

export default RegisterImage;
