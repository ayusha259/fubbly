import { Button } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../../../actions/userAction";

import "./PostForm.scss";

const PostForm = ({ closeHandle }) => {
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
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
  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("content", content);
    formData.append("image", image);
    dispatch(uploadPost(auth.token, formData));
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

      <form onSubmit={handleSubmit}>
        <div className="upload-container">
          <input
            name="image"
            onChange={handleFile}
            accept="image/*"
            className="upload-input"
            id="contained-button-file"
            type="file"
            required
          />
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            name={content}
            className="postForm-content"
            placeholder="Content"
            required
          />
          <div>
            <Button
              style={{ width: "100px", marginTop: "20px" }}
              variant="contained"
              s
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default PostForm;
