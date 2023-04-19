import { useState } from "react";
import { IconButton, Snackbar } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CopyToClipboard = ({ text }) => {
  const [open, setOpen] = useState(false);
  const [Icon, setIcon] = useState(ContentPasteIcon);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(text.toString());
    setIcon(ContentCopyIcon);

    setTimeout(() => {
      setIcon(ContentPasteIcon);
    }, 2000);
  };

  return (
    <>
      <p
        style={{ display: "", alignItems: "center", cursor: "pointer", margin: 0 }}
        onClick={handleClick}
      >
        {Icon === ContentCopyIcon ? "Copied" : "Copy"}
        <IconButton>
          <Icon sx={{ color: "#707070" }} />
        </IconButton>
      </p>
      <Snackbar
        message="Copied to clibboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export default CopyToClipboard;
