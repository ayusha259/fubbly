import { Button } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { uploadImage } from "../../../../actions/userAction";
import "./EditComponent.scss";

const EditComponent = ({ closeHandle }) => {
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const closeBtn = useRef(null);
  const { user, auth } = useSelector((state) => state.userInfo);
  // const handleClose = () => {
  //     setModel(false);
  //     setImageUrl("");
  //   };
  const dispatch = useDispatch();
  const handleFile = (evt) => {
    setImage(evt.target.files[0]);
    setImageUrl(URL.createObjectURL(evt.target.files[0]));
  };
  const handleUpload = () => {
    dispatch(uploadImage(auth.token, image));
    closeHandle();
  };
  if (closeBtn.current) {
    closeBtn.current.addEventListener("click", () => {
      closeBtn.current.classList.add("push-close");
    });
  }
  return (
    <motion.div
      key="edit"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="edit-container"
    >
      <span onClick={closeHandle} ref={closeBtn} id="close-btn">
        <i class="fas fa-times"></i>
      </span>
      <div className="image-container">
        {imageUrl ? <img src={imageUrl} alt="" /> : "No image selected"}
      </div>
      <div className="upload-container">
        <input
          name="image"
          onChange={handleFile}
          accept="image/*"
          className="upload-input"
          id="contained-button-file"
          type="file"
        />
        <div>
          <Button
            style={{ width: "100px" }}
            variant="contained"
            s
            color="primary"
            onClick={handleUpload}
          >
            Submit
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default EditComponent;
