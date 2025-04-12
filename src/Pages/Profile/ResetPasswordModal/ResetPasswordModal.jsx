import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { modalStyle } from "../../../utils/constant";
import { InputField } from "../../../Components/FormElements/InputField/InputField";
import { userRequset } from "../../../apis/requestMethods";

const emptyFields = {
  oldpassword: "",
  newpassword: "",
};
const ResetPasswordModal = ({ open, handleClose }) => {
  const [formValues, setFormValues] = useState({
    ...emptyFields,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      const res = await userRequset.post("/auth/reset-password", formValues);
      if (res.data && res.data.success) {
        handleClose();
        setFormValues({
          ...emptyFields,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={() => modalStyle(400)}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ marginBottom: "10px" }}
        >
          Reset Password
        </Typography>
        <div className="flex flex-col gap-5">
          <InputField
            label={"Old Passwrod"}
            value={formValues.oldpassword}
            name={"oldpassword"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter Old Password"}
          />
          <InputField
            label={"New Password"}
            value={formValues.newpassword}
            name={"newpassword"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter New Password"}
          />
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Reset
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ResetPasswordModal;
