import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./backgroundremover.module.css";
import { Button } from "@mui/material";
import TransitionsModal from "../../../Component/featureSection/utils/Modal/Modal";
import { toastError, toastInfo, toastSuccess } from "../../../utils/toast-message";
import { ToastContainer } from "react-toastify";

const thumbsContainer = {
  width: "22%",
  minHeight: "30%",
  overflowY: "scroll",
};

const thumb = {
  display: "inline-flex",
  flexDirection: "column",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  // marginBottom: 8,
  marginRight: 8,
  width: 90,
  height: 90,
  padding: 4,
  boxSizing: "border-box",
  position: "relative", // add position rule
};

const thumbInner = {
  display: "flex",
  flexDirection: "row",
  minWidth: 20,
  overflow: "hidden",
  position: "relative", // add position rule
};

const removeBtn = {
  position: "absolute",
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  borderRadius: "50%",
  border: "none",
  width: "25px",
  height: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

const BackgroundRemover = () => {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState("original");
  const [files, setFiles] = useState([]);
  const [removedBgFiles, setRemovedBgFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // -------------------- Dropzone -----------------------------------
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      const filteredFiles = acceptedFiles.filter(
        (file) => !files.some((f) => f.name === file.name)
      );

      setFiles((prevFiles) => [
        ...prevFiles,
        ...filteredFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
      handleImageSelect(filteredFiles[0]);
    },
  });

  // --------------------- Remove File -------------------------------
  const removeFile = (file) => {
    if (option === "original") {
      setFiles((prevFiles) =>
        prevFiles.filter((prevFile) => {
          return prevFile.name !== file.name;
        })
      );
      const index = files.findIndex((f) => f.name === file.name);
      const newFile = files[index + 1] ? files[index + 1] : files[index - 1] || null;
      setSelectedFile(newFile);
    } else {
      setRemovedBgFiles((prevFiles) =>
        prevFiles.filter((prevFile) => {
          return prevFile.name !== file.name;
        })
      );
      const index = removedBgFiles.findIndex((f) => f.name === file.name);
      const newFile = removedBgFiles[index + 1]
        ? removedBgFiles[index + 1]
        : removedBgFiles[index - 1] || null;
      setSelectedFile(newFile);
    }
  };

  // --------------------- Image Select -------------------------------
  const handleImageSelect = (file) => {
    if (!file) {
      setSelectedFile(null);
    } else {
      setSelectedFile(Object.assign(file, { preview: URL.createObjectURL(file) }));
    }
  };

  // --------------------- Image Preview -------------------------------
  const images = option === "original" ? files : removedBgFiles;
  const thumbs = images.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          alt="dropzone"
          src={file.preview}
          style={{}}
          onClick={() => {
            handleImageSelect(file);
          }}
          // Revoke data uri after image is loaded
          // onLoad={() => {
          //   URL.revokeObjectURL(file.preview);
          // }}
        />
        <button
          style={removeBtn}
          onClick={() => {
            removeFile(file);
          }}
        >
          <DeleteIcon fontSize="small" />
        </button>
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      removedBgFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, []);

  // --------------------- Removing Image Background Function ----------------------
  const removeBackground = async () => {
    // create a new empty file object
    toastInfo("Removing background...");
    // Convert image file to blob
    const blob = await fetch(selectedFile.preview).then((response) =>
      response.blob()
    );
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);

    reader.onload = async () => {
      // Convert ArrayBuffer to Uint8Array
      const data = new Uint8Array(reader.result);

      const response = await fetch(
        `${import.meta.env.VITE_FLASK_URL}/ecomm/remove_background`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: data,
        }
      );
      // Handle response from server
      if (!response.ok) {
        console.error("Error:", response.statusText);
        toastError(response.statusText);
      } else {
        const outputBlob = await response.blob();
        // Create a new file from the output blob
        const newFile = new File([outputBlob], selectedFile.name, {
          type: "image/jpeg",
        });
        // Create an object url of the blob that can be used as image src
        const outputBlobUrl = URL.createObjectURL(outputBlob);
        // add it to list of removed background images
        setRemovedBgFiles((prevFiles) => [
          ...prevFiles,
          Object.assign(newFile, {
            ...selectedFile,
            preview: outputBlobUrl,
          }),
        ]);

        setOpen(false);
        toastSuccess("Background removed successfully!");
      }
    };
  };

  // --------------------- Download Image -------------------------------
  const downloadImage = () => {
    // create a temporary anchor element
    const anchor = document.createElement("a");
    // set the href attribute to the object URL of the blob
    anchor.href = selectedFile.preview;
    // set the download attribute to the name of the file
    anchor.download = selectedFile.name;
    // simulate a click on the anchor element
    anchor.click();
  };

  // --------------------- UI ------------------------------------------
  return (
    <>
      <ToastContainer />
      <TransitionsModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
      <div className={styles.options}>
        <p
          onClick={() => {
            handleImageSelect(files[0]);
            setOption("original");
          }}
        >
          Original Images
        </p>
        <p
          onClick={() => {
            handleImageSelect(removedBgFiles[0]);
            setOption("removed");
          }}
        >
          Background Removed
        </p>
      </div>

      {/* ------------------ Normal Images -------------------------- */}
      {option === "original" ? (
        <div className={styles.dropZoneCard}>
          <section className={styles.container}>
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>

            {/* ---------------content--------------------- */}
            {files.length > 0 && (
              <div className={styles.content}>
                <aside style={thumbsContainer} className={styles.thumbsContainer}>
                  {thumbs}
                </aside>
                <img
                  src={selectedFile.preview}
                  alt="selectedImage"
                  className={styles.selectedImg}
                />
                <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      removeBackground();
                    }}
                    className={styles.bgButton}
                  >
                    Remove Background
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
      ) : (
        <>
          <div className={styles.dropZoneCard}>
            <section className={styles.container}>
              {removedBgFiles.length > 0 && (
                <div className={styles.content}>
                  <aside style={thumbsContainer}>{thumbs}</aside>
                  <img
                    src={selectedFile.preview}
                    alt="selectedImage"
                    className={styles.selectedImg}
                  />
                  <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        downloadImage();
                      }}
                      className={styles.bgButton}
                    >
                      Download Image
                    </Button>
                  </div>
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default BackgroundRemover;
