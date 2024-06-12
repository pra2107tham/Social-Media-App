import React, { useState } from "react";
import Comment from "../../assets/comment.png";
import Heart from "../../assets/like.png";
import Share from "../../assets/share.png";
import NotLike from "../../assets/notlike.png";
import "./Post.css";

const Post = () => {
  const [liked, setLiked] = useState("");
  const url =
    attribute.format === "image"
      ? `data:image/jpeg;base64,${data}`
      : `data:video/mp4;base64,${data}`;

  const handleLikes = async () => {
    console.log("Attributes", attribute);
    const formData = {
      _id: attribute._id,
      userID: localStorage.getItem("userID"),
    };
    const response = await axios.post("/profile/like", formData);
    console.log("like response : ", response);
    if (response.status === 200) {
      console.log("result : ", response);
    }
  };

  return (
    <div className="Post">
      {attribute.format === "image" ? (
        <img src={url} alt="imagePreviewx" />
      ) : (
        <video
          src={url}
          alt="videoplayer"
          controls
          style={{ maxWidth: "100%" }}
        />
      )}

      <div className="postReact">
        <img
          src={attribute.likedUser.includes() ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLikes}
        />
        <img src={Comment} alt="" style={{ cursor: "pointer" }} />
        <img src={Share} alt="" style={{ cursor: "pointer" }} />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {liked.likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{attribute.name}</b>
        </span>
        <span> {attribute.desc === undefined ? attribute.desc : null}</span>
      </div>
    </div>
  );
};

export default Post;
