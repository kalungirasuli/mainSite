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
                Profilesrc={ '../../../public/images/doctor.png'} 
                videoSrc={post.videoSrc || '../../../public/videos/hello.mp4'} 
                ChatsenderName={post.ChatsenderName || 'Opinni Isaac'} 
                Chattext={post.Chattext || 'This is the first chat message on the app and it is a doctor commenting on a post of another doctor'}  
                ChatSent={post.ChatSent || true} 
                Chatfile={post.imageUrl || '../../../public/images/doctor.png'} 
                ChatfileType={post.ChatfileType || 'image'} 
                ChatsenderPicture={post.ChatsenderPicture || '../../../public/images/doctor.png'} 
                ChatimageSrc={post.imageUrl || '../../../public/images/doctor.png'} 
                Cahttime={post.Cahttime || '2h'} 
                Chatsenderrole={post.Chatsenderrole || 'doctor'}  
                author={post.firstName + " " + post.secondName || 'Kalungi Rasuli'} 
                role={post.role || 'doctor'} 
                time={post.time || '1m'} 
                following={post.following || 'true'} 
                text={post.content || 'Lorem https://www.example.com, consectetur adipisicing elit. Optio libero voluptates quia a quo saepe natus perspiciatis totam assumenda molestias distinctio, id vero architecto nulla. Molestiae quis earum saepe illum. Esse accusantium provident aliquid odio est, mollitia hic, at possimus deleniti voluptate id, quas eius voluptas ut placeat et? Maxime ab maiores laboriosam non, facilis commodi iusto dolores ex tempore porro. Assumenda rerum qui autem, alias id delectus ad illo architecto iure accusantium sit dignissimos dicta maiores accusamus dolore nam a rem provident expedita explicabo odit ipsum nemo. Fuga impedit, nulla ut earum quidem maxime quos dolor facere quo ducimus.'} 
                file={post.file || true} 
                fileType={post.fileType || 'video'} 
                videoType={post.videoType || 'video/mp4'}
              />
            ))}
        </div>
    );
}