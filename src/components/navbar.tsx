import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TeamOutlined,
  SoundOutlined,
  PlayCircleOutlined,
  ApartmentOutlined,
  BookOutlined,
  SettingOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  theme,
  Avatar,
  Image,
  MenuProps,
  AvatarProps,
  Dropdown,
  Space,
  Button,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { logout, selectAccessRole } from "../features/auth/auth.store";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type SideBarProps = {
  children: React.ReactNode;
};
const { Header, Sider, Content } = Layout;

const accessMenuItems = (role: any) => {
  const items = [
    {
      key: "/users",
      icon: <UserOutlined />,
      label: "users",
    },
    {
      key: "/roles",
      icon: <TeamOutlined />,
      label: "roles",
    },
    {
      key: "/sounds",
      icon: <SoundOutlined />,
      label: "sounds",
    },
    {
      key: "/playlists",
      icon: <PlayCircleOutlined />,
      label: "playlists",
    },
    {
      key: "/events",
      icon: <ApartmentOutlined />,
      label: "events",
    },
    {
      key: "/genres",
      icon: <BookOutlined />,
      label: "genres",
    },
  ];

  let accessItems: any[] = [];

  items.forEach((item) => {
    if (role?.access_page.indexOf(item.label) != -1) {
      accessItems.push(item);
    }
  });
  return accessItems;
};

export const Navbar = (props: SideBarProps): JSX.Element => {
  const logOut = () => {
    dispatch(logout());
    navigate("/");
  };

  const role = useAppSelector(selectAccessRole);

  const items: MenuProps["items"] = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer">
          Profile
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a onClick={logOut} target="_blank" rel="noopener noreferrer">
          Logout
        </a>
      ),
      key: "1",
      danger: true,
    },
  ];
  // const [current, setCurrent] = useState();
  // const onClick: AvatarProps["onClick"] = (e) => {
  //   console.log("click ", e);
  //   setCurrent(e.key);
  // };
  const { children } = props;

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          style={{ height: "100vh" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={accessMenuItems(role)}
          onClick={(item) => {
            navigate(item.key);
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            backgroundColor: "white",
            borderBottomStyle: "solid",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px",
          }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined
              style={{ fontSize: "30px", marginLeft: "10px" }}
              onClick={() => setCollapsed(!collapsed)}
            />
          ) : (
            <MenuFoldOutlined
              style={{ fontSize: "30px", marginLeft: "10px" }}
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
          <div>
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined />}
                  ></Avatar>
                  {/* <DownOutlined /> */}
                </Space>
              </a>
            </Dropdown>
            {/* <Dropdown
            // menu={{ items }}
            //  overlay={menu}
            // trigger={["click"]}
            // placement="bottomLeft"
            > */}
            {/* <Avatar
                // onClick={(e) => e?.preventDefault()}
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              /> */}
            {/* <DownOutlined /> */}
            {/* </Dropdown> */}
          </div>
        </Header>
        <Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Navbar;
