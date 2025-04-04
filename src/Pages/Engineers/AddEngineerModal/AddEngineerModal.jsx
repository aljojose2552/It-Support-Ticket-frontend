import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import SelectBoxField from "../../../Components/FormElements/SelectBoxField/SelectBoxField";
import { InputField } from "../../../Components/FormElements/InputField/InputField";
import axios from "axios";
import { userRequset } from "../../../apis/requestMethods";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const AddEngineerModal = ({
  open,
  handleChange,
  handleSubmit,
  engineerData,
  handleClose,
  isView,
}) => {
  // console.log(isView);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "10px" }}
        >
          Add Engineer
        </Typography>

        <div className="flex gap-2 items-center mb-5">
          <InputField
            label={"First Name"}
            value={engineerData.firstname}
            name={"firstname"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter First Name"}
            disabled={isView}
          />
          <InputField
            label={"Last Name"}
            value={engineerData.lastname}
            name={"lastname"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter Last Name"}
            disabled={isView}
          />
        </div>
        <div className="flex gap-2 items-center mb-5">
          <InputField
            label={"Phone Number"}
            value={engineerData.phone}
            name={"phone"}
            onChange={handleChange}
            type={"number"}
            placeholder={"Enter Phone Number"}
            disabled={isView}
          />
          <SelectBoxField
            label={"Department"}
            value={engineerData.department}
            onChange={handleChange}
            name="department"
            options={options}
            disabled={isView}
          />
        </div>

        <div className="flex gap-2 items-center mb-5">
          <InputField
            label={"Email"}
            value={engineerData.email}
            name={"email"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter Email"}
            disabled={isView}
          />
          {!isView && (
            <InputField
              label={"Password"}
              value={engineerData.password}
              name={"password"}
              onChange={handleChange}
              type={"password"}
              placeholder={"Enter Password"}
              disabled={isView}
            />
          )}
        </div>
        <div className="flex gap-2 items-center mb-5">
          <InputField
            label={"Designation"}
            value={engineerData.designation}
            name={"designation"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter Designation "}
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

export default AddEngineerModal;
