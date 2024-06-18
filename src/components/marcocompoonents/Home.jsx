import React, { useEffect, useState } from "react";
import { deletePost, fetchPostsWithComments } from "../../firebase/post";
import PostCard from "../microcomponents/PostCard";
import Pageload from "../microcomponents/Pageload"; // Replace with your loading indicator 
import { Loading } from "../microcomponents/textComponents";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [userType, setUserType] = useState(null); // State to store user type
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchUserData = async () => {
            // Function to determine user type
            const determineUserType = async (uid) => {
                try {
                    // Check if the user is an admin
                    const adminQuery = query(collection(db, 'admin'), where('uid', '==', uid));
                    const adminSnapshot = await getDocs(adminQuery);
        
                    if (!adminSnapshot.empty) {
                        return 'admin';
                    }
        
                    // Check if the user is a doctor
                    const doctorQuery = query(collection(db, 'doctors'), where('uid', '==', uid));
                    const doctorSnapshot = await getDocs(doctorQuery);
        
                    if (!doctorSnapshot.empty) {
                        return 'doctor';
                    }
        
                    // Check if the user is a mother
                    const motherQuery = query(collection(db, 'mothers'), where('uid', '==', uid));
                    const motherSnapshot = await getDocs(motherQuery);
        
                    if (!motherSnapshot.empty) {
                        return 'mother';
                    }
        
                    // Default user type if no match is found
                    return 'unknown';
                } catch (error) {
                    console.error('Error determining user type: ', error);
                    return 'unknown';
                }
            };

            // Fetch posts and user type
            fetchPostsWithComments((fetchedPosts) => {
                setPosts(fetchedPosts);
                console.log("Posts fetched:", fetchedPosts);
                setLoading(false);
            });

            const type = await determineUserType(user);
            setUserType(type);
            console.log(type)
        };

        fetchUserData();
    }, [user]);

    const handleDeletePost = async (postId) => {
        try {
            await deletePost(postId);
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
  
    
    return (
        <div className="post w-full h-full overflow-y-auto">
          {posts.length === 0 && loading ? <Pageload /> : console.log("Posts fetched:", posts.map((posts)=>(posts.imageUrls[0].value)))} 
            {loading && posts.length===0? <Loading /> : (
                posts.map((post) => (
                    <PostCard 
                        key={post.id}
                        userUid={user}
                        postUid={post.uid}
                        Profilesrc={post.Profilesrc} 
                        AltProfile={'HB'} 
                        author={post.firstName + " " + post.secondName} 
                        role={post.role} 
                        time={post.time} 
                        following={post.following}  
                        text={post.content ? post.content : ""} 
                        imageSrc={post.imageUrls? post.imageUrls[0]: ""}
                        file={post.imageUrls && post.imageUrls[0]? true : false} 
                        fileType={post.imageUrls && post.imageUrls[0]? 'image' : 'video'} 
                        comments={post.comments}
                        postId={post.id}
                        userType={userType}
                        handleDeletePost={handleDeletePost}
                        // videoType={post.videoType || 'video/mp4'}
                    />
                ))
            )}
        </div>
    );
}
