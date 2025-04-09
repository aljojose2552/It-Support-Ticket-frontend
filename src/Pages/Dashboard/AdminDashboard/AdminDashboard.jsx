import React, { useEffect, useState } from "react";
import { userState } from "../../../redux/auth/authSlice";
import { useSelector } from "react-redux";
import { userRequset } from "../../../apis/requestMethods";

const AdminDashboard = () => {
  const { user } = useSelector(userState);
  const [ticketList, setTicketList] = useState([]);

  const fetchTicketList = async () => {
    try {
      const res = await userRequset.get("/ticket/get-all-tickets");
      if (res.data && res.data.success) {
        setTicketList(res.data.tickets);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTicketList();
  }, []);
  return <div></div>;
};

export default AdminDashboard;
