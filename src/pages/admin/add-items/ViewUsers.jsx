import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/auth-context";
import UserTable from "../../../Component/Admin/Tables/UserTable";
import { Typography } from "@mui/material";
import ToggleBlock from "../../../utils/ToggleBlock";

const ViewUsers = () => {
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "Name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => (
        <div>
          <Typography variant="body2" color="textSecondary">
            {params.row.name}
          </Typography>
        </div>
      ),
    },
    {
      field: "Email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => (
        <div>
          <Typography variant="body2" color="textSecondary">
            {params.row.email}
          </Typography>
        </div>
      ),
    },
    {
      field: "Status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <div>
          <Typography variant="body2" color="textSecondary">
            {params.row.active ? "Active" : "Blocked"}
          </Typography>
        </div>
      ),
    },
    {
      field: "Created At",
      headerName: "Created At",
      width: 200,
      renderCell: (params) => (
        <div>
          <Typography variant="body2" color="textSecondary">
            {params.row.createdAt}
          </Typography>
        </div>
      ),
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <ToggleBlock blocked={!params.row.active} type="user" id={params.row.id} />
      ),
    },
  ];
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/ecomm/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data.users);
        setIsLoading(false);
      });
  }, []);

  if (!isLoading)
    return (
      <UserTable
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        rows={users}
        columns={columns}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    );

  return <div>Loading...</div>;
};

export default ViewUsers;
