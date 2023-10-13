import { Button, Input, InputRef, Space, Tooltip } from "antd";
import Icon, {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { useRef, useState } from "react";
import type {
  ColumnFilterItem,
  ColumnsType,
  FilterConfirmProps,
  FilterValue,
  ColumnType,
} from "antd/es/table/interface";
import { useFetchAllRolesQuery } from "../../roles/roles.store";
import Highlighter from "react-highlight-words";
import Moment from "moment";

interface DataType {
  _id: string;
  firstname: string;
  nickName: string;
  lastName: string;
  active: boolean;
  roleId: {
    name: string;
    _id: string;
  };
  user: string;
  email: string;
  password: string;
  gender: string;
  key: string;
}

export interface IRole {
  name: string;
  _id: string;
}

type DataIndex = keyof DataType;

const GenerateColumns = (navigate: any) => {
  const handleBirthDate = (user: any) => {
    const formatDate = Moment(user.birthDay).format("DD-MM-YYYY");

    return formatDate;
  };

  // const formatDate = Moment().format("DD-MM-YYYY");
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  // console.log("formatDate", formatDate);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const { data: roles } = useFetchAllRolesQuery();

  const mappedRoles = (): ColumnFilterItem[] => {
    const filteredRoles: ColumnFilterItem[] = [];

    if (roles) {
      (roles as IRole[]).map((role) =>
        filteredRoles.push({ text: role.name, value: role.name })
      );
    }
    return filteredRoles;
  };

  const iconObj: any = {
    false: <CloseOutlined style={{ color: "red" }} />,
    true: <CheckOutlined style={{ color: "green" }} />,
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> | undefined = [
    {
      title: "FirstName",
      dataIndex: "firstName",
      render: (firstName) => firstName,
      sorter: (a: any, b: any) => a.firstName.localeCompare(b.firstName),
      width: "20%",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      render: (lastName) => lastName,
      sorter: (a: any, b: any) => a.lastName.localeCompare(b.lastName),
      width: "20%",
    },
    {
      title: "Nickname",
      render: (name) => `${name.nickName}`,
      sorter: (a: any, b: any) => a.nickName.localeCompare(b.nickName),
      width: "20%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      onFilter: (value: any, record) => record.gender.indexOf(value) === 0,
      ellipsis: true,
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a: any, b: any) => a.email.localeCompare(b.email),
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    // {
    //   title: "BirthDay",
    //   render: (user) => handleBirthDate(user),
    //   width: "20%",
    // },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      filters: [
        {
          text: "Active",
          value: true,
        },
        {
          text: "InActive",
          value: false,
        },
      ],
      onFilter: (value, record) =>
        String(record.active).indexOf(String(value)) === 0,
      render: (_, record): any => iconObj[String(record?.active)],
      width: "20%",
    },
    {
      title: "Role",
      dataIndex: "roleId",
      filters: mappedRoles(),
      render: (roleId) => String(roleId?.name),
      onFilter: (value: any, record) =>
        record?.roleId.name.indexOf(value) === 0,
      width: "20%",
      ellipsis: true,
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
                  navigate(`/users/${_id}`);
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
export default GenerateColumns;
