import React, { useEffect, useState } from "react";
import DataTable from "../../Components/DataTable/DataTable";
import { Button } from "@mui/material";
import AddEngineerModal from "./AddEngineerModal/AddEngineerModal";
import { userRequset } from "../../apis/requestMethods";
const emptyData = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  phone: "",
  department: "",
  designation: "",
};

const Engineers = () => {
  const [addEngineer, setAddEngineer] = useState(false);
  const [engineerList, setEngineerList] = useState([]);
  const [engineerData, setEngineerData] = useState({
    ...emptyData,
  });
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const columns = [
    { label: "ID", field: "id", width: "5%" },
    { label: "Name", field: "name", width: "20%" },
    { label: "Email", field: "email", width: "15%" },
    { label: "Department", field: "department", width: "15%" },
    { label: "Phone", field: "phone", width: "15%" },
    { label: "Designation", field: "designation", width: "15%" },
    { label: "Actions", field: "actions", width: "15%" },
  ];

  const fetchEngineerList = async () => {
    try {
      const res = await userRequset.get("/engineer/get-all-engineers");
      if (res.data && res.data.success) {
        const engData = await res.data.data.map((item, ind) => {
          const newItem = {
            ...item,
            id: ind + 1,
            name: `${item.firstname} ${item.lastname}`,
          };
          return newItem;
        });
        setEngineerList(engData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(engineerList);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setEngineerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setAddEngineer(false);
    setIsView(false);
    setIsEdit(false);
    setEngineerData({ ...emptyData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = isEdit
        ? await userRequset.put(
            `engineer/update-engineer/${engineerData._id}`,
            engineerData
          )
        : await userRequset.post("/engineer/create-engineer", engineerData);
      // console.log(res);
      if (res.data && res.data.success) {
        setEngineerData({ ...emptyData });
        fetchEngineerList();
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleView = (row) => {
    console.log("View clicked:", row);
    setEngineerData(row);
    setIsView(true);
    setAddEngineer(true);
  };

  const handleEdit = (row) => {
    console.log("Edit clicked:", row);
    setIsEdit(true);
    setEngineerData(row);
    setAddEngineer(true);
  };

  const handleDelete = async (row) => {
    try {
      const res = await userRequset.delete(
        `/engineer/delete-engineer/${row._id}`
      );
      if (res.data && res.data.success) {
        fetchEngineerList();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEngineerList();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center ">
        <h4 className="text-2xl font-semibold">Engineers List </h4>
        <Button variant="contained" onClick={() => setAddEngineer(true)}>
          Add Engineer
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={engineerList}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
      />
      <AddEngineerModal
        open={addEngineer}
        engineerData={engineerData}
        handleChange={handleChange}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isView={isView}
      />
    </div>
  );
};

export default Engineers;
