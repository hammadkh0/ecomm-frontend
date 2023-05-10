import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";

import styles from "./Notebook.module.css";

export default function Notebook() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [keywords, setKeywords] = React.useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSubmit = (e) => {
    e.preventDefault();

    // split keywords by comma and remove any whitespace from each keyword
    const keywordsArr = keywords
      .trim()
      .split(",")
      .map((keyword) => keyword.trim());
    const existingKeywords = JSON.parse(localStorage.getItem("savedKeywords")) || [];
    localStorage.setItem(
      "savedKeywords",
      JSON.stringify([...existingKeywords, ...keywordsArr])
    );
    setKeywords("");
    handleClose();
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setKeywords("");
    handleClose();
  };
  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Notebook
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <form
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            width: "400px",
            fontFamily: "poppins",
          }}
        >
          <label htmlFor="input">
            Enter keywords
            <span style={{ fontSize: "12px", fontStyle: "italic" }}>
              (separated by commas)
            </span>
          </label>
          <textarea
            style={{
              padding: "5px",
              outline: "none",
              borderRadius: "5px",
              marginBottom: "1rem",
              border: "1px solid #707070",
              resize: "none",
              fontFamily: "inherit",
              color: "#707070",
            }}
            rows={3}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <div>
            <button
              disabled={keywords.length === 0}
              style={{
                backgroundColor: "#1C8090",
              }}
              className={styles.notebookBtns}
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              style={{
                backgroundColor: "#dd7973",
              }}
              className={styles.notebookBtns}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </Popover>
    </div>
  );
}
