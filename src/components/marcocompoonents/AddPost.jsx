import React, { useState } from "react";
import HeadWithBack from "../microcomponents/HeadWithBack";
import { TextArea, FilePicker } from "../microcomponents/textComponents";
import { createPost } from "../../firebase/post";
import RoundedButton from "../microcomponents/RoundedButton";
import { useSelector } from "react-redux";


export default function AddPost() {
    const userUid = useSelector((state) => state.auth.user);
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user uiid is " + userUid);
    try {
      await createPost(userUid,content, selectedFile);
      alert("Post created successfully!");
      setContent("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    }
  };

  return (
    <>
      <div className="div">
        <HeadWithBack heading="Add Post" />
        <div className="div w-full">
          <form className="form" onSubmit={handleSubmit}>
            <TextArea
              placeholder="Write your post here"
              ids="post"
              classes="rounded-[10px] p-3 shadow-md w-full border-0 text-left text-[15px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <FilePicker onFileChange={handleFileChange} />
            <RoundedButton text="Post" onClick={handleSubmit}/>
          </form>
        </div>
      </div>
    </>
  );
}
