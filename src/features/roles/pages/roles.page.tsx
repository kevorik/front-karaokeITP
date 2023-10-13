import { Button, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import GenerateColumnsRoles from "../organisms/generateColumns";
import { useFetchAllRolesQuery } from "../roles.store";

const Roles: React.FC = () => {
  const navigate = useNavigate();
  const columns = GenerateColumnsRoles(navigate);
  const createRoleId = "create-role";

  const {
    data: usersData,
    isError,
    isFetching,
    isSuccess,
  } = useFetchAllRolesQuery();
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          style={{ margin: "10px" }}
          type="primary"
          htmlType="submit"
          onClick={() => {
            navigate(`/roles/${createRoleId}`);
          }}
        >
          Add Role
        </Button>
      </div>
      <Table columns={columns} dataSource={usersData}></Table>
      {/* <h1 style={{display: 'flex', justifyContent: 'center'}}>This is roles page.</h1> */}
    </div>
  );
};

export default Roles;
