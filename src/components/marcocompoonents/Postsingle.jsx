
import PostCard from "../microcomponents/PostCard";
import Pageload from "../microcomponents/Pageload"; // Replace with your loading indicator 
import { Loading } from "../microcomponents/textComponents";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPostById, fetchPostsWithComments } from "../../firebase/post";
import { useSelector } from "react-redux";

export default function Postsingle() {
   
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.auth.user);
    const { id } = useParams(); // Get the 'id' parameter from the URL

    useEffect(() => {
        // Function to fetch post by ID
        const fetchSinglePost = async () => {
            try {
                setLoading(true); // Set loading state to true while fetching
                const fetchedPost = await fetchPostById(id); // Replace with your function to fetch post by ID
                setPost(fetchedPost); // Set the fetched post to state
                setLoading(false); // Set loading state to false once data is fetched
            } catch (error) {
                console.error("Error fetching post:", error);
                setLoading(false); // Set loading state to false in case of error
            }
        };

        fetchSinglePost(); // Call the fetch function
    }, [id]); // Depend on 'id' to refetch post when URL parameter changes

    if (loading) {
        return <Loading />; // Replace with your loading indicator component
    }



   
    
    return (
         
        <div className="post w-full h-full overflow-y-auto">
                   <div className="div flex justify-end p-2 sticky top-0">
                    {/* if the user is logined, they will be redirected to the home page index/, if not they are redirected to signup, still if user signed-in as admin the they redirected to admin/pannel. On page load check user signed -in or not. If not signed in show /index/post. */}
                   <Link to='/User/sign-in'>
                   <p className="white text-white text-center text-[15px] w-[max-contain] bg-blue p-2 rounded-lg">view more</p>
                   </Link>
                   </div>
                  
                    <PostCard 
                     key={post.id}
                     userUid={user}
                    //  userDetails={userDetails}
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
                    //  handleSavePost={handleSavePost}
                    //  userType={userType}
                    //  handleDeletePost={handleDeletePost}
                    />
             
        </div>
    );
}
