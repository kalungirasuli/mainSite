import { useEffect, useState } from "react";
import { fetchPostsWithComments } from "../../firebase/post";
import PostCard from "../microcomponents/PostCard"

export default function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
      fetchPostsWithComments((fetchedPosts) => {
        setPosts(fetchedPosts);
        console.log("Posts fetched:", fetchedPosts);
      });
    }, []);
    return (
        <div className="post w-full h-full overflow-y-auto">
            {posts.map((post) => (
              <PostCard 
                key={post.id}
                Profilesrc={post.Profilesrc} 
                AltProfile={ 'HB'}
                videoSrc={post.videoSrc} 
                ChatsenderName={post.ChatsenderName} 
                Chattext={post.Chattext}  
                ChatSent={post.ChatSent} 
                ChatfileType={post.ChatfileType} 
                ChatsenderPicture={post.ChatsenderPicture} 
                ChatimageSrc={post.imageUrl} 
                Cahttime={post.Cahttime} 
                Chatsenderrole={post.Chatsenderrole}  
                author={post.firstName + " " + post.secondName} 
                role={post.role} 
                time={post.time} 
                following={post.following}  
                text={post.content} 
                imageSrc={post.imageUrl}
                file={post.imageUrl || post.videoSrc? true:false} 
                fileType={post.imageUrl? 'image':'video'} 
                videoType={post.videoType || 'video/mp4'}
              />
            ))}
        </div>
    );
}