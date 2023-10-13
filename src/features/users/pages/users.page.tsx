import React, { Key, useEffect, useState } from "react";
import { Button, Input, Pagination, Table } from "antd";
import { useFetchAllUsersQuery } from "../users.store";
import { useNavigate } from "react-router-dom";
import GenerateColumns from "../organisms/generate-columns";
import Icon, { SearchOutlined } from "@ant-design/icons";
interface DataType {
  _id: string;
  name: {
    nickName: string;
    firstName: string;
    lastName: string;
  };
  active: boolean;
  roleId: {
    name: string;
  };
  // birthDay: string;
  password: string;
  gender: string;
  key: string;
}
const Users: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [search, setSearch] = useState("");
  const createUserId = "create-user";

  const navigate = useNavigate();

  const columns = GenerateColumns(navigate);

  const {
    data: usersData,
    isError,
    isFetching,
    isSuccess,
  } = useFetchAllUsersQuery({ currentPage, pageSize, search });

  const [total, setTotal] = useState<number>();

  useEffect(() => {
    if (usersData?.total) {
      setTotal(usersData?.total);
    }
  }, [usersData?.total]);

  // const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
  //   current,
  //   pageSize
  // ) => {
  //   setTotal(usersData?.total);
  // };

  const handleChangePagination = (page: any, pageSize: any) => {
    // if (currentPage <= page) {
    //   setCurrentPage(page);
    // }
    setCurrentPage(page);

    if (currentPage === page) {
      setPageSize(pageSize);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Input
          style={{ width: "700px", height: "35px", margin: "5px" }}
          prefix={<SearchOutlined />}
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        ></Input>
        <Button
          style={{ margin: "10px" }}
          type="primary"
          htmlType="submit"
          onClick={() => {
            navigate(`/users/${createUserId}`);
          }}
        >
          Add User
        </Button>
      </div>
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={usersData?.data} //        dataSource={usersData?.data}
        pagination={false}
        loading={isFetching}
        // onChange={handleChange}
      />
      <Pagination
        current={currentPage}
        showSizeChanger
        defaultCurrent={0}
        total={total}
        onChange={(page, pageSize) => handleChangePagination(page, pageSize)}
      />
    </>
  );
};

export default Users;
