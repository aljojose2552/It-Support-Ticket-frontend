import React, { useEffect, useState } from "react";
import { userRequset } from "../../apis/requestMethods";
import { Button } from "@mui/material";
import DataTable from "../../Components/DataTable/DataTable";
import AddUserModal from "./AddUserModal/AddUserModal";
import Loader from "../../Components/Loader/Loader";
import DeleteModal from "../../Components/DeleteModal/DeleteModal";
import HeadingWithButton from "../../Components/HeadingWithButton/HeadingWithButton";

const emptyData = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
};

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [addUser, setAddUser] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userData, setUserData] = useState({
    ...emptyData,
  });
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const columns = [
    { label: "ID", field: "id", width: "10%" },
    { label: "Name", field: "name", width: "30%" },
    { label: "Email", field: "email", width: "30%" },
    { label: "Actions", field: "actions", width: "15%" },
  ];

  const fetchUserList = async () => {
    setIsLoading(true);

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
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
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

  const handleDelete = (row) => {
    setDeleteId(row._id);
    setDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteId("");
    setDeleteModal(false);
  };
  const deleteUser = async () => {
    try {
      const res = await userRequset.delete(`/user/delete-user/${deleteId}`);
      if (res.data && res.data.success) {
        fetchUserList();
        handleCloseDeleteModal();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <HeadingWithButton
        buttonLabel={"Add User"}
        handleClickButton={() => setAddUser(true)}
        heading={"User List"}
      />

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
      <DeleteModal
        handleSubmit={deleteUser}
        handleClose={handleCloseDeleteModal}
        label={"User"}
        open={deleteModal}
      />
    </div>
  );
};

export default Users;
