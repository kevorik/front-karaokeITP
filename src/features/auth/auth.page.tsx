import { Button, Input, Space } from "antd";
import React, { useState } from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { login, useLoginMutation } from "./auth.store";
import { useAppDispatch } from "../../store/hooks";
import AuthImage, {
  AuthImagehead,
} from "../../components/AuthImage/AuthImagehead";
import AuthImagelow from "../../components/AuthImage/AuthImagelow";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [loginRequest, { isLoading, error: errData }] = useLoginMutation();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handeEmail = (e: any) => {
    setEmail(e);
  };

  const handeChangePassword = (e: any) => {
    setPassword(e);
  };

  const onSubmit = async () => {
    const data = {
      nickName: email,
      password: password,
    };
    if (email !== "" && password !== "" && password.length >= 6) {
      try {
        const jwtResponse = await loginRequest(data).unwrap();

        if (jwtResponse) {
          dispatch(login(jwtResponse));
          navigate("/main");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <ErrorBoundary>
        <div
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <div style={{ width: "45%" }}>
            <div style={{ fontSize: "60px", marginBottom: "30px" }}>Log in</div>
            <div
              style={{
                fontSize: "20px",
                color: "dimgrey",
                marginBottom: "30px",
              }}
            >
              Welcome Back! Please enter your details.
            </div>
            <h1 style={{ fontSize: "20px" }}>Email</h1>
            <Input
              style={{ height: "45px" }}
              placeholder="Enter your email"
              prefix={<UserOutlined />}
              value={email}
              onChange={(event) => {
                handeEmail(event.target.value);
              }}
            />

            <h1 style={{ fontSize: "20px" }}>Password</h1>
            <Input.Password
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={(event: any) => {
                handeChangePassword(event.target.value);
              }}
              value={password}
              style={{ marginBottom: "30px", height: "45px" }}
            />
            {errData && (
              <div style={{ color: "red" }}> {errData.data.error} </div>
            )}

            <Button
              style={{ width: "100%", marginBottom: "15px", height: "45px" }}
              onClick={onSubmit}
              type="primary"
            >
              Sign in
            </Button>
            <span style={{ display: "flex", justifyContent: "center" }}>
              Don't have an account?
              <Link style={{ paddingLeft: "10px" }} to={"/register"}>
                Sign up
              </Link>
            </span>
          </div>
        </div>
        <div>
          <AuthImagehead path={"src/image/IMG_3738 3.png"} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AuthImagelow path={"src/image/Logo itp.svg"} />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default LoginPage;
