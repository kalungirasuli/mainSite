import React, { useEffect, useState } from "react";
import { fetchPostsWithComments } from "../../firebase/post";
import PostCard from "../microcomponents/PostCard";
import Pageload from "../microcomponents/Pageload"; // Replace with your loading indicator 
import { Loading } from "../microcomponents/textComponents";
import { useSelector } from "react-redux";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const user = useSelector((state) => state.auth.user);
    useEffect(() => {
        fetchPostsWithComments((fetchedPosts) => {
            setPosts(fetchedPosts);
            console.log("Posts fetched:", fetchedPosts);
            !posts.length===0?setLoading(false):''; // Set loading to false once data is fetched
            
        });
    }, []);
   
    
    return (
        <div className="post w-full h-full overflow-y-auto">
          {posts.length === 0 && loading ? <Pageload /> : console.log("Posts fetched:", posts.map((posts)=>(posts.imageUrls[0].value)))} 
            {loading && posts.length===0? <Loading /> : (
                posts.map((post) => (
                    <PostCard 
                        key={post.id}
                        userUid={user}
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
                        // videoType={post.videoType || 'video/mp4'}
                    />
                ))
            )}
        </div>
    );
}
