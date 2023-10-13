import { Avatar, Card, Form, Switch, Upload } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useUpdateActiveMutation } from "../users.store";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

type UserCardsTypesProps = {
  user: any;
  toogle?: boolean;
  id: string | undefined;
};

export const UserCards = (props: UserCardsTypesProps) => {
  const { user, id } = props;

  const [updateActive] = useUpdateActiveMutation();
  const [toggle, setToggle] = useState(user.active);

  const toggler = async (values: boolean) => {
    if (id) {
      const response = updateActive({ active: values, id: id });
      if (await response) {
        setToggle(values);
        toggle ? setToggle(false) : setToggle(true);
      }
    }
  };

  return (
    <Card
      title={user?.nickName}
      bordered={false}
      style={{ width: "calc(100% - 20px)", height: 500 }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Avatar size={150} icon={<UserOutlined />} />
      </div>
      <div
        style={{
          display: "flex",
          height: "100px",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column-reverse",
        }}
      >
        <Switch checked={toggle} onClick={toggler} />
        {toggle ? <span>Active</span> : <span>InActive</span>}
      </div>
      <Form.Item
        rules={[
          {
            max: 1,
            message: "Password must contain at least 6 characters!",
          },
        ]}
        style={{ display: "flex", justifyContent: "center" }}
        valuePropName="fileList"
      >
        <Upload action="/upload.do" listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>
    </Card>
  );
};
