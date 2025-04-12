import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { modalStyle } from "../../../utils/constant";
import SelectBoxField from "../../../Components/FormElements/SelectBoxField/SelectBoxField";
import { userRequset } from "../../../apis/requestMethods";

const AssignTicketModal = ({
  open,
  setOpen,
  engineerList,
  selectedTicket,
  fetchList,
}) => {
  const [engineer, setEngineer] = useState("");
  const engineerOptions = engineerList.map((item) => ({
    label: `${item.firstname} ${item.lastname}`,
    value: item._id,
  }));
  console.log(engineer);
  const handleClose = () => {
    setOpen(false);
    setEngineer("");
  };

  const handleSubmit = async () => {
    const payload = {
      engineerId: engineer,
    };
    try {
      const res = await userRequset.patch(
        `/ticket/assign-ticket/${selectedTicket._id}`,
        payload
      );
      if (res.data && res.data.success) {
        fetchList();
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={()=>modalStyle(800)}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "10px" }}
        >
          Assign Ticket
        </Typography>
        <SelectBoxField
          label={"Select Engineer"}
          value={engineer}
          onChange={(e) => setEngineer(e.target.value)}
          options={engineerOptions}
        />
        <div className="flex justify-end gap-2 mt-5">
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default AssignTicketModal;
