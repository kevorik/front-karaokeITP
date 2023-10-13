import {
  Button,
  Form,
  Input,
  Select,
  SelectProps,
  RadioChangeEvent,
  Radio,
} from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  rolesApi,
  useCreateRoleMutation,
  useUpdateRoleMutation,
} from "../roles.store";
import { UserOutlined } from "@ant-design/icons";
import React from "react";

type RoleFormProps = {
  role: any;
  isSuccess: boolean;
  id: string | undefined;
};

// const options: SelectProps["options"] = [];
// for (let i = 10; i < 36; i++) {
//   options.push({
//     value: i.toString(36) + i,
//     label: i.toString(36) + i,
//   });
// }

const options: SelectProps["options"] = [
  { value: "sounds", label: "Sounds" },
  { value: "roles", label: "Roles" },
  { value: "users", label: "Users" },
  { value: "playlists", label: "Playlists" },
  { value: "main", label: "Main" },
  { value: "genres", label: "Genres" },
  { value: "events", label: "Events" },
];

const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

export const RoleForm = (props: RoleFormProps): any => {
  let { role, isSuccess, id } = props;
  const [createRole, {}] = useCreateRoleMutation();
  const navigate = useNavigate();
  const [updateRole] = useUpdateRoleMutation();
  // const [accesspage, set] = useState<string>("");

  if (role === null) {
    role = {
      name: "",
      active: "",
      access_page: "",
    };
  }

  const roleForm = useMemo(() => {
    return {
      name: role.name || "",
      active: role.active || "",
      access_page: role.access_page || "",
    };
  }, [role]);

  // const [componentSize] = useState<SizeType | "default">("default");
  const onFinish = async (values: any) => {
    if (id && id !== "create-role") {
      const roleData = {
        id: id,
        payload: {
          ...values,
        },
      };
      const response = await updateRole(roleData);
    } else {
      const roleData = {
        payload: {
          ...values,
        },
      };

      const response = await createRole(roleData);

      if (response) {
        navigate(-1);
      }
    }
  };
  return (
    <>
      <div>
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
            initialValues={roleForm}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="vertical"
            // size={componentSize as SizeType}
            onFinish={onFinish}
          >
            <Form.Item
              label="Name"
              style={styles.formField}
              rules={[{ required: true, message: "Please input your Name!" }]}
              name="name"
            >
              <Input
                maxLength={40}
                style={styles.formInput}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="name"
              />
            </Form.Item>
            <Form.Item
              label="Pages"
              style={styles.formPage}
              rules={[
                {
                  required: true,
                  message: "Field Role is required!",
                },
                // { min: 1 },
                // // {
                // //   validator: (_, value) =>
                // //     value && value !== []
                // //       ? Promise.resolve()
                // //       : Promise.reject(),
                // // },
              ]}
              name="access_page"
            >
              <Select
                mode="multiple"
                placeholder="Please select"
                // defaultValue={accesspage}
                // onChange={handleChange}
                style={{ width: "100%" }}
                options={options}
              />
              {/* {role.access_page &&
                  role.access_page.map((role: any, index: any) => (
                    <React.Fragment key={index}>
                      <Select.Option value={role.access_page}>
                        {role.access_page}
                      </Select.Option>
                    </React.Fragment>
                  ))} */}
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
                  {id === "create-role" ? "Create role" : "Update role"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </div>
    </>
  );
};

export default RoleForm;

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
    // width: "1000px",
    // marginLeft: "100px",
  },
  formPage: {
    padding: "10px",
    marginBottom: "0px",
    width: "900px",
    marginLeft: "100px",
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

{
  /* <Form.Item
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
              </Select> */
}
