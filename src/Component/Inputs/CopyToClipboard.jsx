import { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const CopyToClipboard = ({ text }) => {
  const [open, setOpen] = useState(false);
  const [Icon, setIcon] = useState(ContentPasteIcon);

  const handleClick = () => {
    try {
      setOpen(true);
      navigator.clipboard.writeText(text.toString());
      setIcon(ContentCopyIcon);

      setTimeout(() => {
        setIcon(ContentPasteIcon);
      }, 2000);
    } catch (err) {
      console.log(err);
      setIcon(ErrorOutlineIcon);
    }
  };

  return (
    <>
      <p
        style={{ display: "", alignItems: "center", cursor: "pointer", margin: 0 }}
        onClick={handleClick}
      >
        {Icon === ContentPasteIcon ? "Copy" : ContentCopyIcon ? "Copied" : "Error"}
        <IconButton>
          <Icon sx={{ color: "#707070" }} />
        </IconButton>
      </p>
      <Snackbar
        message="Copied to clipboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export default CopyToClipboard;
