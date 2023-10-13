import React from "react";
import { Button, Space, Table, Tooltip } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import Icon, { EditOutlined } from "@ant-design/icons";
interface DataType {
  name: string;
  active: boolean;
  access_page: [string, string];
}

const AccessPageColumn = (array: string[]) => {
  const newArray: any[] = [];
  array.map((el) => {
    newArray.push({
      name: el,
      color: Math.floor(Math.random() * 16777215).toString(16),
    });
  });

  return (
    <>
      {newArray.map((el, index) => {
        return (
          <div //style={{ color: `#${el.color}` }}
            key={index}
          >
            {el.name}
          </div>
        );
      })}
    </>
  );
};

const GenerateColumnsRoles = (navigate: any) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Page",
      dataIndex: "access_page",
      render: (access_page_array) => AccessPageColumn(access_page_array),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      width: "20%",
      render: (_id) => (
        <Space direction="vertical">
          <Space wrap>
            <Tooltip title="Edit">
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => {
                  navigate(`/roles/${_id}`);
                }}
              ></Button>
            </Tooltip>
          </Space>
        </Space>
      ),
    },
  ];
  return columns;
};
export default GenerateColumnsRoles;
