import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import { InputField } from "../../../Components/FormElements/InputField/InputField";
import { departmentOptions, modalStyle } from "../../../utils/constant";
import SelectBoxField from "../../../Components/FormElements/SelectBoxField/SelectBoxField";

const AddTicketModal = ({
  open,
  handleChange,
  handleSubmit,
  ticketData,
  handleClose,
  isView,
}) => {
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
          Add Ticket
        </Typography>
        <div className="flex gap-2 items-center mb-5">
          <InputField
            label={"Title"}
            value={ticketData.title}
            name={"title"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter Title"}
            disabled={isView}
          />
          <InputField
            label={"Description"}
            value={ticketData.description}
            name={"description"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter Description"}
            disabled={isView}
          />
        </div>
        <div className="flex gap-2 items-center mb-5">
          <SelectBoxField
            label={"Department"}
            value={ticketData.department}
            onChange={handleChange}
            name="department"
            options={departmentOptions}
            disabled={isView}
          />
        </div>
        {!isView && (
          <div className="flex justify-end gap-2 mt-5">
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default AddTicketModal;
