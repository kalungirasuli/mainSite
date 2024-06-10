import React, { useEffect, useState } from "react";
import HeadWithBack from "../microcomponents/HeadWithBack";
import { TextArea, FilePicker } from "../microcomponents/textComponents";
import { createPost } from "../../firebase/post";
import RoundedButton from "../microcomponents/RoundedButton";
import { useSelector } from "react-redux";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
  const userUid = useSelector((state) => state.auth.user);
  const [content, setContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const user = useSelector(state => state.auth.user);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    
  
    // Function to determine user type
    const determineUserType = async () => {
      if (user) {
        try {
          console.log("User ID: ", user);
          const uid = user;

          // Check if the user is a doctor
          const doctorQuery = query(collection(db, 'doctors'), where('uid', '==', uid));
          const doctorSnapshot = await getDocs(doctorQuery);

          if (!doctorSnapshot.empty) {
            setUserType('doctor');
            console.log("User is a doctor");
            return;
          }

          // Check if the user is a mother
          const motherQuery = query(collection(db, 'mothers'), where('uid', '==', uid));
          const motherSnapshot = await getDocs(motherQuery);

          if (!motherSnapshot.empty) {
            setUserType('mother');
            console.log("User is a mother");
          }
        } catch (error) {
          console.error("Error determining user type: ", error);
        }
      } else {
        navigate('/User/sign-in')
        console.log("No user found");
      }
    };

    determineUserType();


  }, [user]);
  const handleFileChange = (files) => {
    setSelectedFiles(files);
    console.log(files)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("user uiid is " + userUid);
    try {
      await createPost(userUid, content, selectedFiles);
      alert("Post created successfully!");
      setContent("");
      setSelectedFiles([]);
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
            <RoundedButton text="Post" onClick={handleSubmit} />
          </form>
        </div>
      </div>
    </>
  );
}
