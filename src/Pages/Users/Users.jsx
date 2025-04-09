import React, { useEffect, useState } from "react";
import { userRequset } from "../../apis/requestMethods";
import { Button } from "@mui/material";
import DataTable from "../../Components/DataTable/DataTable";
import AddUserModal from "./AddUserModal/AddUserModal";

const emptyData = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

const Users = () => {
  const [addUser, setAddUser] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userData, setUserData] = useState({
    ...emptyData,
  });
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const columns = [
    { label: "ID", field: "id", width: "10%" },
    { label: "Name", field: "name", width: "30%" },
    { label: "Email", field: "email", width: "30%" },
    { label: "Actions", field: "actions", width: "15%" },
  ];

  const fetchUserList = async () => {
    try {
      const res = await userRequset.get("/user/get-all-users");
      if (res.data && res.data.success) {
        const userData = await res.data.data.map((item, ind) => {
          const newItem = {
            ...item,
            id: ind + 1,
            name: `${item.firstname} ${item.lastname}`,
          };
          return newItem;
        });
        setUserList(userData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setAddUser(false);
    setIsView(false);
    setIsEdit(false);
  };

  const handleView = (row) => {
    setUserData(row);
    setIsView(true);
    setAddUser(true);
  };

  const handleEdit = (row) => {
    setIsEdit(true);
    setUserData(row);
    setAddUser(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { ...userData, role: "user" };
      const res = isEdit
        ? await userRequset.put(`user/update-user/${userData._id}`, data)
        : await userRequset.post("/user/create-user", data);
      if (res.data && res.data.success) {
        setUserData({ ...emptyData });
        fetchUserList();
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (row) => {
    try {
      const res = await userRequset.delete(`/user/delete-user/${row._id}`);
      if (res.data && res.data.success) {
        fetchUserList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center ">
        <h4 className="text-2xl font-semibold">User List </h4>
        <Button variant="contained" onClick={() => setAddUser(true)}>
          Add User
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={userList}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
      />
      <AddUserModal
        open={addUser}
        setOpen={setAddUser}
        userData={userData}
        handleChange={handleChange}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isView={isView}
      />
    </div>
  );
};

export default Users;
