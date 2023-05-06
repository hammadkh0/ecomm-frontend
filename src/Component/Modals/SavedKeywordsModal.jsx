import React from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Close } from "@mui/icons-material";

import styles from "./SavedKeywords.module.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  borderRadius: 3,
};

const kwds = JSON.parse(localStorage.getItem("savedKeywords"));

const SavedKeywordsModal = (props) => {
  const [savedKeywords, setSavedKeywords] = React.useState(kwds);
  const [selectedKeywords, setSelectedKeywords] = React.useState([]);

  console.log({ savedKeywords });
  console.log({ selectedKeywords });
  const handleSelectedKeywords = (keyword) => {
    setSelectedKeywords((prev) => {
      if (!prev.includes(keyword)) {
        return [...prev, keyword];
      } else {
        return prev;
      }
    });
    setSavedKeywords((kwrds) => {
      const filteredKwds = kwrds.filter((kwd) => kwd !== keyword);
      return filteredKwds;
    });
  };

  const handleUseKeywords = () => {
    const kws = selectedKeywords.join(" ");
    props.setKeywords(kws);
    props.handleClose();
  };

  const handleRemoveSelected = (keyword) => {
    setSelectedKeywords((prev) => {
      const filtered = prev.filter((kwd) => kwd !== keyword);
      return filtered;
    });
    setSavedKeywords((prev) => [...prev, keyword]);
  };

  const handleRemoveSaved = (keyword) => {
    // remove from localstorage array
    const filtered = savedKeywords.filter((kwd) => kwd !== keyword);
    setSavedKeywords(filtered);
    // localStorage.setItem("savedKeywords", JSON.stringify(filtered));
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={props.open}>
        <Box sx={style}>
          <Box>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontSize: "20px",
              }}
            >
              Saved Keywords
            </Typography>
            {savedKeywords?.map((keyword, idx) => (
              <p key={idx} className={styles.bubble}>
                <span onClick={() => handleSelectedKeywords(keyword)}>
                  {keyword}
                </span>
                <span onClick={() => handleRemoveSaved(keyword)}>
                  <Close />
                </span>
              </p>
            ))}
            <hr />
          </Box>
          <Box>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontSize: "20px",
              }}
            >
              Selected Keywords
            </Typography>
            {selectedKeywords?.map((keyword, idx) => (
              <p key={idx} className={styles.bubble}>
                <span>{keyword}</span>
                <span onClick={() => handleRemoveSelected(keyword)}>
                  <Close />
                </span>
              </p>
            ))}
          </Box>
          <Box>
            <Button
              id="transition-btn"
              variant="outlined"
              color="success"
              onClick={handleUseKeywords}
            >
              Use keywords
            </Button>
            <Button
              id="transition-btn"
              variant="outlined"
              color="error"
              onClick={props.handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SavedKeywordsModal;
