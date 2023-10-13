import { useMemo, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useAppDispatch } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { register, useRegisterMutation } from "../../auth/auth.store";
import { UserOutlined } from "@ant-design/icons";
import RegisterImage from "../../../components/AuthImage/RegisterImage";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

export const RegisterForm = (): any => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };
  const dispatch = useAppDispatch();

  const [blank, setBlank] = useState("");
  const [blerror, setBlerror] = useState("Поле не может быть пустым!");
  const [nickName, setNickName] = useState<string>("");
  const [registerRequest, { isLoading, error: errData }] =
    useRegisterMutation();
  const navigate = useNavigate();
  const handeNickName = (e: any) => {
    setNickName(e);
  };
  const blankHandler = (e: any) => {
    setBlank(e.targetn.value);
    if (!e.target.value) {
      setBlerror;
    }
  };
  const userForm = {
    nickName: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
  };

  const onFinish = async (values: any) => {
    const registerData = {
      payload: {
        ...values,
        nickName: nickName,
      },
    };
    console.log("registerData", registerData);

    try {
      const response = await registerRequest(registerData);
      console.log("responseresponse", response);

      if (!response?.error) {
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <ErrorBoundary>
          <Form
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              height: "100vh",
            }}
            name="normal_login"
            className="login-form"
            initialValues={userForm}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="vertical"
            // size={componentSize as SizeType}
            onFinish={onFinish}
          >
            <div>
              <div style={{ fontSize: "60px", marginBottom: "30px" }}>
                Sign Up
              </div>
              <Form.Item
                label="Nickname"
                style={styles.formField}
                rules={[
                  { required: true, message: "Please input your Nickname!" },
                  {
                    validator: (_, value) =>
                      !value.includes(" ")
                        ? Promise.resolve()
                        : Promise.reject(new Error("No spaces allowed")),
                  },
                ]}
                name="nickName"
              >
                <Input
                  maxLength={40}
                  style={styles.formInput}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Nickname"
                  onChange={(event) => {
                    handeNickName(event.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="First Name"
                style={styles.formField}
                rules={[
                  { required: true, message: "Please input your First Name!" },
                  {
                    validator: (_, value) =>
                      !value.includes(" ")
                        ? Promise.resolve()
                        : Promise.reject(new Error("No spaces allowed")),
                  },
                ]}
                name="firstName"
              >
                <Input
                  maxLength={40}
                  style={styles.formInput}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="First Name"
                />
              </Form.Item>
              <Form.Item
                label="Last Name"
                style={styles.formField}
                name="lastName"
                rules={[
                  { required: true, message: "Please input your Last Name!" },
                  {
                    validator: (_, value) =>
                      !value.includes(" ")
                        ? Promise.resolve()
                        : Promise.reject(new Error("No spaces allowed")),
                  },
                ]}
              >
                <Input
                  maxLength={40}
                  style={styles.formInput}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Last Name"
                />
              </Form.Item>
              <Form.Item
                label="Email"
                style={styles.formField}
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your correct Email!",
                  },
                  {
                    validator: (_, value) =>
                      !value.includes(" ")
                        ? Promise.resolve()
                        : Promise.reject(new Error("No spaces allowed")),
                  },
                ]}
                name="email"
              >
                <Input
                  maxLength={50}
                  style={styles.formInput}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                style={styles.formField}
                rules={[
                  {
                    required: true,
                    message: "Please input your correct Password!",
                  },
                  {
                    min: 6,
                    message: "Password must contain at least 6 characters!",
                  },
                  {
                    validator: (_, value) =>
                      !value.includes(" ")
                        ? Promise.resolve()
                        : Promise.reject(new Error("No spaces allowed")),
                  },
                ]}
                name="password"
                hasFeedback
              >
                <Input.Password
                  style={styles.formInput}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item
                style={styles.formField}
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  {
                    min: 6,
                    message: "Password must contain at least 6 characters!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                  {
                    validator: (_, value) =>
                      !value.includes(" ")
                        ? Promise.resolve()
                        : Promise.reject(new Error("No spaces allowed")),
                  },
                ]}
              >
                <Input.Password style={styles.formInput} />
              </Form.Item>
              <Form.Item
                label="Gender"
                style={styles.formField}
                rules={[
                  {
                    required: true,
                    message: "Please input your correct Gender!",
                  },
                ]}
                name="gender"
              >
                <Select style={styles.formInput}>
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>
              {errData && (
                <div style={{ color: "red" }}> {errData.data.error} </div>
              )}
              <div
                style={{
                  width: "100%",
                  height: "100px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <div>
                  <Button
                    style={styles.buttonDetails1}
                    onClick={() => navigate(-1)}
                    type="primary"
                  >
                    Back
                  </Button>
                </div>
                <div>
                  <Button
                    style={styles.buttonDetails}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </Form>
          <div>
            <div>
              <RegisterImage path={"src/image/itp_register.png"} />
            </div>
          </div>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default RegisterForm;

const styles = {
  formInput: {
    height: "50px",
    width: "480px",
    display: "flex",
    // paddingTop: "20px",
    // paddingLeft: "20px",
    // paddingRight: "20px",
    // paddingBottom: "20px",
  },
  formField: {
    // padding: "10px",
    marginBottom: "0px",
  },
  formButton: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "20px",
  },
  buttonDetails: {
    width: "132px",
    height: "40px",
  },
  buttonDetails1: {
    width: "132px",
    height: "40px",
  },
};
