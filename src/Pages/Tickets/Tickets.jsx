import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "../../Components/DataTable/DataTable";
import AddTicketModal from "./AddTicketModal/AddTicketModal";
import { userRequset } from "../../apis/requestMethods";
import { useSelector } from "react-redux";
import { userState } from "../../redux/auth/authSlice";
import AssignTicketModal from "./AssignTicketModal/AssignTicketModal";

const emptyData = {
  title: "",
  description: "",
  department: "",
};

const columns = [
  { label: "ID", field: "id", width: "5%" },
  { label: "Title", field: "title", width: "10%" },
  { label: "Description", field: "description", width: "20%" },
  { label: "Department", field: "department", width: "10%" },
  { label: "Created By", field: "userName", width: "10%" },
  { label: "Assign To", field: "engName", width: "10%" },
  { label: "Actions", field: "actions", width: "15%" },
];

const updateResValues = async (list) => {
  return list.map((item, ind) => {
    const newItem = {
      ...item,
      id: ind + 1,
      engName: item.assignedTo
        ? `${item.assignedTo.firstname} ${item.assignedTo.lastname}`
        : "Not Assigned",
      userName: `${item.createdBy.firstname} ${item.createdBy.lastname}`,
    };
    return newItem;
  });
};

const Tickets = () => {
  const { user } = useSelector(userState);
  const { role } = user;
  const [addTicket, setAddTicket] = useState(false);
  const [assignTicketModal, setAssignTicketModal] = useState(false);
  const [TicketList, setTicketList] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [engineerList, setEngineerList] = useState([]);
  const [ticketData, setTicketData] = useState({
    ...emptyData,
  });
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchAssignedTickets = async () => {
    try {
      const res = await userRequset.get("/ticket/get-assinged-tickets");
      if (res.data && res.data.success) {
        const tktData = await updateResValues(res.data.tickets);
        setTicketList(tktData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCreatedTickets = async () => {
    try {
      const res = await userRequset.get("/ticket/get-createdby-tickets");
      if (res.data && res.data.success) {
        const tktData = await updateResValues(res.data.tickets);
        setTicketList(tktData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTicketList = async () => {
    try {
      const res = await userRequset.get("/ticket/get-all-tickets");
      if (res.data && res.data.success) {
        const tktData = await updateResValues(res.data.tickets);
        setTicketList(tktData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEngineersBasedDepartment = async (department) => {
    try {
      const res = await userRequset.get(
        `/engineer/get-all-engineers?department=${department}`
      );
      if (res.data && res.data.success) {
        setEngineerList(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTicketData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setAddTicket(false);
    setIsView(false);
    setIsEdit(false);
    setTicketData({ ...emptyData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = isEdit
        ? await userRequset.put(
            `ticket/update-ticket/${ticketData._id}`,
            ticketData
          )
        : await userRequset.post("/ticket/create-ticket", ticketData);
      // console.log(res);
      if (res.data && res.data.success) {
        setTicketData({ ...emptyData });
        if (role === "user") {
          fetchCreatedTickets();
        } else {
          fetchTicketList();
        }
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAssignTicket = (row) => {
    setSelectedTicket(row);
    setAssignTicketModal(true);
    fetchEngineersBasedDepartment(row.department);
  };

  const handleView = (row) => {
    console.log("View clicked:", row);
    setTicketData(row);
    setIsView(true);
    setAddTicket(true);
  };

  const handleEdit = (row) => {
    console.log("Edit clicked:", row);
    setIsEdit(true);
    setTicketData(row);
    setAddTicket(true);
  };

  const handleDelete = async (row) => {
    try {
      const res = await userRequset.delete(`/ticket/delete-ticket/${row._id}`);
      if (res.data && res.data.success) {
        fetchTicketList();
      }
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "something went wrong");
    }
  };

  useEffect(() => {
    if (role === "engineer") {
      fetchAssignedTickets();
    } else if (role === "user") {
      fetchCreatedTickets();
    } else {
      fetchTicketList();
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center ">
        <h4 className="text-2xl font-semibold">Tickets List </h4>
        {(user.role === "admin" || user.role === "user") && (
          <Button variant="contained" onClick={() => setAddTicket(true)}>
            Add Ticket
          </Button>
        )}
      </div>
      <DataTable
        columns={columns}
        data={TicketList}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
        handleAssignTicket={handleAssignTicket}
      />
      <AddTicketModal
        open={addTicket}
        ticketData={ticketData}
        handleChange={handleChange}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        isView={isView}
      />

      {role === "admin" && (
        <AssignTicketModal
          setOpen={setAssignTicketModal}
          open={assignTicketModal}
          engineerList={engineerList}
          selectedTicket={selectedTicket}
          fetchList={fetchTicketList}
        />
      )}
    </div>
  );
};

export default Tickets;
