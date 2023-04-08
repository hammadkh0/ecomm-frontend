import React from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import ConfirmationModal from "./ConfirmationModal";

const UserActions = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleEdit = () => {
    console.log("Edit");
  };

  const handleDelete = () => {
    console.log("Delete");
    props.onDeleteRow(props.id);
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const styles = {
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(0.8)",
    },
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Tooltip title="Edit">
          <Edit sx={{ ...styles, color: "info.main" }} onClick={handleEdit} />
        </Tooltip>

        <Tooltip title="Delete">
          <Delete sx={{ ...styles, color: "error.main" }} onClick={handleOpen} />
        </Tooltip>
      </Box>

      <ConfirmationModal
        open={open}
        handleConfirm={handleDelete}
        handleClose={handleClose}
        text={props.text}
        warningText={props.warningText}
      />
    </>
  );
};

export default UserActions;
