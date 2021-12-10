import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadPost } from "../../actions/userAction";
import Navbar from "../../components/Navbar/Navbar";

import "./AddPost.scss";

const AddPost = () => {
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const { auth } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const handleFile = (evt) => {
    setImage(evt.target.files[0]);
    setImageUrl(URL.createObjectURL(evt.target.files[0]));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("content", content);
    formData.append("image", image);
    dispatch(uploadPost(auth.token, formData));
    navigate("/home");
  };
  return (
    <>
      <Navbar showSearch={true} />
      <div className="addpost-container">
        <div className="image-container">
          {imageUrl ? <img src={imageUrl} alt="" /> : "No image selected"}
        </div>

        <form className="upload-container" onSubmit={handleSubmit}>
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
            name="content"
            className="postForm-content"
            placeholder="Content"
            rows={5}
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
        </form>
      </div>
    </>
  );
};

export default AddPost;
