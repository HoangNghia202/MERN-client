import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Badge } from "@mui/material";
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "flex",
  flexDirection: "column",
  borderRadius: 2,
  marginBottom: 8,
  marginRight: 8,
  maxWidth: 100,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function DropZoneImage(props) {
  const { clearImg, sizeFiles, setFieldValue, action } = props;
  const [files, setFiles] = useState([]);
  console.log("files: ", files[0]);

  const clearImgInput = () => {
    console.log("clearImg");
    setFiles([]);
  };

  useEffect(() => {
    clearImgInput();
  }, [clearImg]);

  setFieldValue;

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      console.log("acceptedFiles: ", acceptedFiles[0]);

      if (action === "post") {
        setFieldValue(acceptedFiles[0]);
      } else {
        setFieldValue("picture", acceptedFiles[0]);
      }
    },
    maxFiles: sizeFiles,
  });

  const thumbs = files.map((file) => (
    <>
      <Badge
        badgeContent={"x"}
        color="error"
        className="cursor-pointer"
        onClick={() => {
          clearImgInput();
        }}
      >
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img
              src={file.preview}
              style={img}
              // Revoke data uri after image is loaded
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
          </div>
        </div>
      </Badge>
    </>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container w-[100%]">
      <div
        {...getRootProps({ className: "dropzone" })}
        style={{
          border: "3px dashed #BDBDBD",
          padding: "20px",
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <input {...getInputProps()} />
        <p className="text-[20px] text-gray-400">
          Drag 'n' drop your Avatar picture here, or click to select files
        </p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}

export default DropZoneImage;
