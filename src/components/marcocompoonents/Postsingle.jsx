
import PostCard from "../microcomponents/PostCard";
import Pageload from "../microcomponents/Pageload"; // Replace with your loading indicator 
import { Loading } from "../microcomponents/textComponents";
import { Link } from "react-router-dom";

export default function Postsingle() {
   
    the 
    
    return (
         
        <div className="post w-full h-full overflow-y-auto">
                   <div className="div flex justify-end p-2 sticky top-0">
                    {/* if the user is logined, they will be redirected to the home page index/, if not they are redirected to signup, still if user signed-in as admin the they redirected to admin/pannel. On page load check user signed -in or not. If not signed in show /index/post. */}
                   <Link to='/User/sign-in'>
                   <p className="white text-white text-center text-[15px] w-[max-contain] bg-blue p-2 rounded-lg">view more</p>
                   </Link>
                   </div>
                    <PostCard 
                        // key={post.id}
                        // userUid={user}
                        // Profilesrc={post.Profilesrc}
                        AltProfile={'HB'} 
                        // author={post.firstName + " " + post.secondName} 
                        // role={post.role} 
                        // time={post.time} 
                        // following={post.following}  
                        // text={post.content ? post.content : ""} 
                        // imageSrc={post.imageUrls? post.imageUrls[0]: ""}
                        // file={post.imageUrls && post.imageUrls[0]? true : false} 
                        // fileType={post.imageUrls && post.imageUrls[0]? 'image' : 'video'} 
                        // comments={post.comments}
                        // postId={post.id}
                        // videoType={post.videoType || 'video/mp4'}
                    />
             
        </div>
    );
}
