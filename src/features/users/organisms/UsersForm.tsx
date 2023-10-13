import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Select,
  notification,
  Space,
  Avatar,
  Switch,
} from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  UpdateActivityResponse,
  useCreateUserMutation,
  useUpdateActiveMutation,
  useUpdateUserMutation,
} from "../users.store";
import { UserOutlined } from "@ant-design/icons";
import { useFetchAllRolesQuery } from "../../roles/roles.store";
import Moment from "moment";
import "dayjs/locale/zh-cn";
import dayjs from "dayjs";
import moment from "moment";
import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU"; // import Toggle from "../atoms/Toggle";
import "dayjs/plugin/utc";

type UsersFormProps = {
  user: any;
  isSuccess: boolean;
  id: string | undefined;
};

type NotificationType = "success";

export const UsersForm = (props: UsersFormProps): any => {
  let { user, isSuccess, id } = props;
  const [createUsers, {}] = useCreateUserMutation();
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();
  const { data: roles } = useFetchAllRolesQuery();

  if (user === null) {
    user = {
      nickName: "",
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      roleId: "",
      // birthDay: "",
      active: "",
      password: "",
    };
  }

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "User Changed",
    });
  };
  const dateFormat = "YYYY-MM-DD+hh:mm";

  const userForm = useMemo(() => {
    return {
      nickName: user.nickName || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      gender: user.gender || "",
      roleId: user.roleId || "",
      // birthDay: dayjs(user.birthDay).format(dateFormat) || "",
      active: user.active || "",
      password: user.password || "",
    };
  }, [user]);

  const [componentSize] = useState<SizeType | "default">("default");
  const onFinish = async (values: any) => {
    if (id && id !== "create-user") {
      const userData = {
        id: id,
        payload: {
          ...values,
        },
      };
      const response = await updateUser(userData);
    } else {
      const userData = {
        payload: {
          ...values,
        },
      };

      const response = await createUsers(userData);

      if (response) {
        navigate(-1);
      }
    }
  };
  const dateString = dayjs(user.birthDay, "YYYY-MM-DD+h:mm");

  console.log(dateString);

  return (
    <>
      <div>
        {contextHolder}
        {isSuccess && (
          <Form
            style={{
              background: "white",
              borderRadius: "8px 8px 8px 8px",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              marginLeft: "30px",
            }}
            name="normal_login"
            className="login-form"
            initialValues={userForm}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="vertical"
            size={componentSize as SizeType}
            onFinish={onFinish}
          >
            <Form.Item
              label="Nickname"
              style={styles.formField}
              rules={[
                { required: true, message: "Please input your Nickname!" },
              ]}
              name="nickName"
            >
              <Input
                maxLength={40}
                style={styles.formInput}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Nickname"
              />
            </Form.Item>
            <Form.Item
              label="First Name"
              style={styles.formField}
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
            <Form.Item label="Gender" style={styles.formField} name="gender">
              <Select style={styles.formInput}>
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Role"
              style={styles.formField}
              rules={[{ required: true, message: "Please input your roleId!" }]}
              name="roleId"
            >
              <Select style={styles.formInput}>
                {roles &&
                  roles.map((role: any) => (
                    <React.Fragment key={role._id}>
                      <Select.Option value={role._id}>
                        {role.name}
                      </Select.Option>
                    </React.Fragment>
                  ))}
              </Select>
            </Form.Item>
            <div
              style={{
                width: "100%",
                height: "100px",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
                padding: "10px",
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
                  {id === "create-user" ? "Create user" : "Update user"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </div>
    </>
  );
};

export default UsersForm;

const styles = {
  formInput: {
    height: "50px",
    width: "450px",
    display: "flex",
    // paddingTop: "20px",
    // paddingLeft: "20px",
    // paddingRight: "20px",
    // paddingBottom: "20px",
  },
  formField: {
    padding: "10px",
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
  // buttonActionContainer: {
  //   width: "100%",
  //   height: "100px",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   display: "flex",
  //   padding: "10px",
  // },
};
