import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./backgroundremover.module.css";
import { Button } from "@mui/material";

const thumbsContainer = {
  display: "flex",
  flexDirection: "column",
  marginTop: 16,
  minHeight: "30%",
  overflowY: "scroll",
};

const thumb = {
  display: "inline-flex",
  //   flexDirection: "column",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
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
  width: "22px",
  height: "22px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

const BackgroundRemover = () => {
  const [option, setOption] = useState("original");
  const [files, setFiles] = useState([]);
  const [removedBgFiles, setRemovedBgFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // -------------------- Dropzone -----------------------------------
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: true,
    maxFiles: 7,
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
      console.log(filteredFiles);
      setSelectedFile(URL.createObjectURL(filteredFiles[0]));
    },
  });
  const removeFile = (file) => {
    setFiles((prevFiles) =>
      prevFiles.filter((prevFile) => {
        return prevFile.name !== file.name;
      })
    );
    const index = files.findIndex((f) => f.name === file.name);
    const newFile = files[index + 1] ? files[index + 1] : files[index - 1] || null;
    handleImageSelect(newFile);
  };

  const handleImageSelect = (file) => {
    if (!file) {
      setSelectedFile(null);
    }
    setSelectedFile(URL.createObjectURL(file));
  };
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
          <DeleteIcon fontSize="24px" />
        </button>
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeBackground = async () => {
    console.log("remove bg");
    const data = new FormData();
    data.append("image", selectedFile);

    const response = await fetch("/ecomm/remove_background", {
      method: "POST",
      body: data,
    });

    const result = await response.json();
    const outputBlob = new Blob([result.output], { type: "image/png" });
    console.log(
      "🚀 ~ file: BackgroundRemover.jsx:146 ~ removeBackground ~ outputBlob:",
      outputBlob
    );
    const outputBlobUrl = URL.createObjectURL(outputBlob);
    console.log(
      "🚀 ~ file: BackgroundRemover.jsx:148 ~ removeBackground ~ outputBlobUrl:",
      outputBlobUrl
    );
  };
  // --------------------- UI -----------------------------------
  return (
    <>
      <div className={styles.options}>
        <p
          onClick={() => {
            setOption("original");
          }}
        >
          Original Images
        </p>
        <p
          onClick={() => {
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
                <aside style={thumbsContainer}>{thumbs}</aside>
                {selectedFile && (
                  <img
                    src={selectedFile}
                    alt="selectedImage"
                    className={styles.selectedImg}
                  />
                )}
                <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                  <Button variant="outlined">Remove Background</Button>
                </div>
              </div>
            )}
          </section>
        </div>
      ) : (
        <>
          {removedBgFiles.length > 0 && (
            <div className={styles.content}>
              <aside style={thumbsContainer}>{thumbs}</aside>
              {selectedFile && (
                <img
                  src={selectedFile}
                  alt="selectedImage"
                  className={styles.selectedImg}
                />
              )}
              <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                <Button variant="outlined" onClick={removeBackground}>
                  Remove Background
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default BackgroundRemover;
