import { IoSearchSharp } from 'react-icons/io5';
import { IoIosImages } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchSavedPosts } from '../../firebase/post';

export default function SavePost() {
    const [savedPosts, setSavedPosts] = useState([]);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (user) {
            fetchSavedPosts(user, (posts) => {
                setSavedPosts(posts);
            });
        } else {
            console.error('User is not logged in or UID is missing.');
        }
    }, [user]);

    return (
        <>
            <label htmlFor='search' className="div p-2 px-5 rounded-full border-solid border-[1px] border-greytextfade outline-[1px] outline-greytextfade flex justify-between gap-2">
                <span className="w-[max-content] h-[max-content] m-auto">
                    <IoSearchSharp className='text-greytextdark icon'/>
                </span>
                <input type="search" name="" placeholder='Search archive' id="search" className="w-full h-[30px] rounded-full outline-none" />
            </label>
                   
            <div className="div mt-5">
                {savedPosts.map((post) => (
                    <Link to={`/post/${post.id}`} key={post.id}>
                        <PostSaved post={post} />
                    </Link>
                ))}
            </div>
        </>
    )
}

function PostSaved({ post }) {
    return (
        <div className="div border-solid border-[1px] border-greytextfade rounded-[10px] p-2 mb-4">
            <div className="div relative">
                <div className="div flex flex-row gap-2">
                    <div className="div w-[50px] h-[50px] rounded-[50%] bg-greytextfade">
                        {/* the author's image */}
                        <img src={post.Profilesrc || "https://picsum.photos/200"} alt="HB" className='text-[20px] text-greytexdark text-center m-auto w-[50px] h-[50px] rounded-full' loading='lazy'/>
                    </div>
                    <div className="div flex flex-col ">
                        {/* the poster's name or author */}
                        <span className="text-[15px] font-bold">{post.firstName +" " +post.secondName || "Unknown Author"}</span>
                        {/* the time of the post */}
                        {/* <span className="text-[12px] text-greytext">{post.timestamp || "Unknown Time"}</span> */}
                    </div>
                </div>
                {/* the text of the post just a few characters to show how post */}
                <div className="div p-2">
                    <p className="text-[15px] text-greytextdark">
                        {post.content ? post.content.substring(0, 30) + '...' : ''}
                    </p>
                </div>
                {/* the icon appears if the post holds a file of image type */}
                {post.imageUrls && post.imageUrls.length > 0 && (
                    <span className='absolute top-3 right-3 w-[max-content] h-[max-content]'>
                        <IoIosImages className='text-greytextdark text-[20px]'/>
                    </span>
                )}
            </div>
        </div>
    );
}
