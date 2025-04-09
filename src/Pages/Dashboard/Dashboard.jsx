import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userState } from "../../redux/auth/authSlice";
import { userRequset } from "../../apis/requestMethods";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import { Button } from "@mui/material";
import DataTable from "../../Components/DataTable/DataTable";

const Dashboard = () => {
  const { user } = useSelector(userState);
  const [ticketList, setTicketList] = useState([]);
  const [addticket, setAddTicket] = useState(false);

  const columns = [
    { label: "ID", field: "id", width: "5%" },
    { label: "Name", field: "name", width: "20%" },
    { label: "Email", field: "email", width: "15%" },
    { label: "Department", field: "department", width: "15%" },
    { label: "Phone", field: "phone", width: "15%" },
    { label: "Designation", field: "designation", width: "15%" },
    { label: "Actions", field: "actions", width: "15%" },
  ];

  const fetchTicketList = async () => {
    try {
      const res = await userRequset.get("/ticket/get-all-tickets");
      if (res.data && res.data.success) {
        const tktData = await res.data.tickets.map((item, ind) => {
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
        setTicketList(tktData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("tickets", ticketList);

  useEffect(() => {
    if (user.role === "admin") {
      fetchTicketList();
    }
  }, []);

  if (user.role === "admin") {
    return <AdminDashboard />;
  }
  return <div>test</div>;
};

export default Dashboard;
