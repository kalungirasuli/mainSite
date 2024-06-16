import { MdVerifiedUser } from "react-icons/md";
import { RiAccountPinBoxLine, RiDeleteBin4Line, RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { RotatingLines } from "react-loader-spinner";
import React from 'react';
import {Img} from 'react-image'
import VisibilitySensor from 'react-visibility-sensor'
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { LiaCommentSolid } from "react-icons/lia";
import { CiShare1 } from "react-icons/ci";
import { IoSend,IoAttachSharp, IoCheckmark } from "react-icons/io5";
import { BsImage } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaVideo } from "react-icons/fa6";
import {useState} from "react";
import { addComment } from "../../firebase/post";
import TimeFormater from "./Formater";
// the image component
const Loader=()=>{
    return(
        <>
        <div className="loader bg-greytextfade w-full h-[400px] max-h-[400px] rounded-[20px] -z-50 relative ">
            <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[max-content]">
            <RotatingLines
             visible={true}
             height="35"
             width="35"
             strokeWidth="5"
             animationDuration="1"
             ariaLabel="rotating-lines-loading"
             wrapperClass=""
            />
            </div>
            
        </div>
        </>
    )
    
}
const Image =(props)=>{
    return(
        <>
    <VisibilitySensor>
    <Img src={props.src} className="w-full min-h-[200px] max-h-[400px] md:max-h-[600px] md:min-h-[250px] rounded-[20px]" loader={<Loader/>} unloader={<Loader/>}/>
    </VisibilitySensor>
    </>
    )
}

// the video compontent
 const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {options, onReady,srcs} = props;

  React.useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [srcs,options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div className="rounded-[20px]" ref={videoRef} />
    </div>
  );
}


// the message cards

const MessageDoctor=(props)=>{
  const style={
    fontSize:'20px',
    color:'#3b8aff'
}
const style2={
  fontSize:'20px',
  color:'#3d4652'

}
const largeicons={
  fontSize:'50px',
  color:'#D9D9D9'
}
//this function checks if the sent message is from the same user
//then it will return the message card with the user profile picture
//else it will return the message card without the user profile picture
//this if the message thread has not been appended by other users
const ChatID=props.ChatUserId==props.ChatUserCurrent?true:false


const getInitials = (name) => {
  if (!name) return ''; // Return empty string if name is undefined or null
  
  const names = name.split(' ');
  if (names.length === 1) {
    return name.charAt(0).toUpperCase();
  } else {
    return names[0].charAt(0).toUpperCase() + names[names.length - 1].charAt(0).toUpperCase();
  }
};

// Get initials from sender's name
const initials = getInitials(props.ChatsenderName);
  return( 
      <>
      <div className="header flex flex-row justify-normal px-3 gap-3 w-[max-content] max-w-[90%] md:max-w-[80%] " id={ChatID}>
              <div className="img rounded-[50%] w-[40px] h-[40px]  m-0 ">
                 <Link to={props.profileLink} className='rounded-[50%] w-[40px] h-[40px]  m-0'>
                  {/* the image should not appear if the user is the same as the current user send the message */}
                 <img src={props.ChatsenderPicture} alt={initials} className={`p-0  w-full h-full  rounded-[50%] text-center text-[20px] text-greytextdark `}/>
                 </Link>
              </div>
              <div className="detailes w-full bg-white rounded-b-[20px] rounded-se-[20px] p-2 border-solid border-[1px] border-greytextfade ">
                  <div className="controls flex flex-row justify-between">
                     <ul className="flex flex-row justify-between gap-5 w-full">
                          <li className=" w-[max-content] text-[15px] text-greytextdark font-bold">
                          {props.ChatsenderName}
                          </li>
                          
                          {props.Chatsenderrole=='doctor'|| props.Chatsenderrole=='admin'?<li className="w-[max-content]"><div className="verified"><MdVerifiedUser style={style} color={'#3b8aff'} /></div></li>:''}
                            
                          <TimeFormater timestamp={props.Cahttime?props.Cahttime:null}/>
                     </ul>
                     <div className="postOperaions">
                      <ul className="">
                          {/* {props.ChatSent ?<li className="w-[max-content] hover:bg-greytextfade p-2 "><RiUserFollowLine style={style}  className="icon-small"/></li>: <li className="w-[max-content] p-2 hover:bg-greytextfade"><IoCheckmark style={style} color="#726F6F"/></li>} */}
                          {/* {!props.ChatSent ?<li className="w-[max-content]  "><RiUserFollowLine style={style}  className="icon-small"/></li>: <li className="w-[max-content] p-2 "><IoCheckmark style={style} color="#726F6F"/></li>} */}
                         
                      </ul>
                     </div>
                  </div>
                  {/* this only appears when the users is refferanced the message in the comment */}
                  {/* <Link to={props.ChatRef} className="postText w-full border-l-blue border-l-3 ">
                    <ul className="flex w-auto">
                            <li className=" w-[max-content] text-[15px] text-greytextdark font-bold">
                            {props.ChatsenderName}
                            </li>
                            
                            {props.Chatsenderrole=='doctor'|| props.Chatsenderrole=='admin'?<li className="w-[max-content]"><div className="verified"><MdVerifiedUser style={style} color={'#3b8aff'} /></div></li>:''}
                        
                            <li className=" w-[max-content] text-[15px] text-greytextfade">
                            {props.Cahttime}
                            </li>
                      </ul>
                      <p className="m-0 pb-2 text-[13px] lg:text-black lg:text-[15px]">{props.ChatrefText?ChatrefText.subString(0,20):''}</p>
                     {props.ChatrefFile ?  <div className="postFile w-full rounded-[15px] border-[1px] border-greytextfade py-3 px-2 bg-slate-100">{props.ChatrefFileType=='image'?<img src={props.ChatRefimage} loading="lazy" />:<video src={props.ChatRefvideo} type={Chat}></video>}</div>:''}
                  </Link> */}
                  {/* end of the refferance */}
                  <div className="postText w-full">
                      <p className="m-0 pb-2 text-[13px] lg:text-black lg:text-[15px]">{props.Chattext}</p>
                  </div>
                  {props.Chatfile ?  <div className="postFile w-[contain] rounded-[15px] border-[1px] border-greytextfade py-3 px-2">{props.ChatfileType=='image'? <img src={props.ChatimageSrc} className="w-auto min-h-[100px] max-h-[450px] md:max-h-[500px] m-auto rounded-[10px]"  />:<VideoJS options={{autoplay: false,controls: true,responsive: true,fluid: true,sources: [{src :props.ChatvideoSrc,type: props.ChatvideoType}]}}  onReady={handlePlayerReady} />}</div>:''}
            
                  <div className="postcontrol flex flex-row justify-end gap-4 p-3">
                  {/* <LiaCommentSolid style={style2} className="icon-small"/>  */}
                  <RiDeleteBin4Line style={style2} className="icon-small"/>
                  </div>
                  
              </div>
              
              
          </div>
      </>
  )
}

export default function PostCard(props) {
  const style = {
    fontSize: '25px',
    color: '#3b8aff'
  };
  const style2 = {
    fontSize: '25px',
    color: '#3d4652'
  };

  const [comment, setComment] = useState(false);
  const [newComment, setNewComment] = useState('');

  const toggleCommentSection = () => {
    setComment(!comment);
  };

  const handleAddComment = async () => {
    if (newComment.trim() !== '') {
      try {
        await addComment(props.userUid, props.postId, newComment);
        setNewComment('');
        alert('comment submited')
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <>
      {/* Post card content */}
      <div className="border-y-[1px] border-x-greytextfade pt-5 w-full -z-50">
        <div className="header flex flex-row justify-between px-3 gap-3">
          <div className="img rounded-[50%] w-[40px] h-[40px] m-0">
            <Link to={props.profileLink} className='rounded-[50%] w-[40px] h-[40px] m-0'>
              <img src={props.Profilesrc} alt={props.AltProfile} className="p-0 w-full h-full rounded-[50%] text-center font-bold text-greytextfade text-[20px]" />
            </Link>
          </div>
          <div className="detailes w-full">
            <div className="controls flex flex-row justify-between">
              <ul className="flex flex-row justify-between w-full">
                <li className="w-[max-content] text-[15px] text-greytextdark font-bold">
                  {props.author}
                </li>
                {props.role === 'doctor' || props.role === 'admin' ? (
                  <li className="w-[max-content]">
                    <div className="verified">
                      <MdVerifiedUser style={style} color={'#3b8aff'} />
                    </div>
                  </li>
                ) : ''}
                <li className="w-[max-content] text-[15px] text-greytextfade">
                  {props.time}
                </li>
              </ul>
            </div>
            <div className="postText w-full py-4">
              <span className="m-0 p-0 text-[13px] break-all lg:text-black lg:text-[15px]">{props.text}</span>
            </div>
            {props.file ? (
              <div className="postFile w-full min-w-[min-content] bg-gray-300 rounded-[25px] border-[1px] border-greytextfade">
                {props.fileType === 'image' ? (
                  <Image src={props.imageSrc} alt="Post file" className="rounded-[15px]" />
                ) : (
                  <video src={props.videoSrc} controls className="w-full rounded-[15px]" />
                )}
              </div>
            ) : ''}
            <div className="postcontrol flex flex-row justify-between p-3">
              <span className="flex gap-[5px]" onClick={toggleCommentSection} >
             
              <LiaCommentSolid style={style2} className="icon-small"/>
              <div className="bagde w-[max-content] h-[max-content] p-[1px] text-[15px] mt-1">
               {props.comments ? (props.comments.length >= 1000 ? '1000+' : props.comments.length) : ''}
              </div>
              </span>
              <CiShare1 style={style2} className="icon-small" />
              <RiDeleteBin4Line style={style2} className="icon-small" />
            </div>
          </div>
        </div>
        {comment && (
          <div className="comments w-full h-[510px] align-middle md:h-[650px] border-t-[1px] border-t-greytextfade">
            <div className="chats w-[90%] flex flex-col gap-2 m-auto p-3 h-[440px] md:h-[540px] overflow-y-auto overflow-x-hidden">
              {props.comments.map(comment => (
                <MessageDoctor
                  key={comment.id}
                  Chattext={comment.comment}
                  ChatsenderName={comment.firstName + ' ' + comment.secondName}
                  Cahttime={new Date(comment.timestamp.seconds * 1000).toLocaleString()}
                  ChatsenderPicture={comment.ChatsenderPicture}
                  Chatsenderrole={comment.role}
                />
              ))}
            </div>
            <div className="input p-3 flex flex-row justify-between w-full bg-gray-100">
              <input
                type="text"
                className="w-[87%] rounded-[20px] h-[45px] px-3 text-gray-800"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <span className="h-[max-content] m-auto" onClick={handleAddComment}>
                <IoSend style={style2} onClick={handleAddComment} />
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}