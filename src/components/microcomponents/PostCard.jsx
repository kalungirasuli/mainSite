
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
import { AiOutlineAudio } from "react-icons/ai";
import { Link } from "react-router-dom";
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
    <Img src={props.src} className="w-full min-h-[200px] max-h-[400px] md:max-h-[600px] md:min-h-[250px] rounded-[20px]" loader={<Loader/>} unloader={<Loader/>} crossOrigin="annonymous"/>
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
  return(
      <>
      <div className="header flex flex-row justify-normal px-3 gap-3 w-[max-content] max-w-[90%] md:max-w-[80%] ">
              <div className="img rounded-[50%] w-[40px] h-[40px]  m-0 ">
                 <Link to={props.profileLink} className='rounded-[50%] w-[40px] h-[40px]  m-0'>
                 <img src={props.ChatsenderPicture}  className={`p-0  w-full h-full  rounded-[50%] `}/>
                 </Link>
              </div>
              <div className="detailes w-full bg-gray-50 rounded-b-[20px] rounded-se-[20px] p-2 ">
                  <div className="controls flex flex-row justify-between">
                     <ul className="flex flex-row justify-between w-auto">
                          <li className=" w-[max-content] text-[15px] text-greytextdark font-bold">
                          {props.ChatsenderName}
                          </li>
                          
                          {props.Chatsenderrole=='doctor'|| props.Chatsenderrole=='admin'?<li className="w-[max-content]"><div className="verified"><MdVerifiedUser style={style} color={'#3b8aff'} /></div></li>:''}
                      
                          <li className=" w-[max-content] text-[15px] text-greytextfade">
                          {props.Cahttime}
                          </li>
                     </ul>
                     <div className="postOperaions">
                      <ul className="">
                          {/* {props.ChatSent ?<li className="w-[max-content] hover:bg-greytextfade p-2 "><RiUserFollowLine style={style}  className="icon-small"/></li>: <li className="w-[max-content] p-2 hover:bg-greytextfade"><IoCheckmark style={style} color="#726F6F"/></li>} */}
                          {!props.ChatSent ?<li className="w-[max-content]  "><RiUserFollowLine style={style}  className="icon-small"/></li>: <li className="w-[max-content] p-2 "><IoCheckmark style={style} color="#726F6F"/></li>}
                         
                      </ul>
                     </div>
                  </div>
                  <div className="postText w-full">
                      <p className="m-0 pb-2 text-[13px] lg:text-black lg:text-[15px]">{props.Chattext}</p>
                  </div>
                  {props.Chatfile ?  <div className="postFile w-full rounded-[15px] border-[1px] border-greytextfade py-3 px-2">{props.ChatfileType=='image'? <Image src={props.ChatimageSrc}  />:<VideoJS options={{autoplay: false,controls: true,responsive: true,fluid: true,sources: [{src :props.ChatvideoSrc,type: props.ChatvideoType}]}}  onReady={handlePlayerReady} />}</div>:''}
            
                  <div className="postcontrol flex flex-row justify-end gap-4 p-3">
                  <LiaCommentSolid style={style2} className="icon-small"/>
                  <RiDeleteBin4Line style={style2} className="icon-small"/>
                  </div>
                  
              </div>
              
              
          </div>
      </>
  )
}

export default function PostCard(props){
 const style={
        fontSize:'25px',
        color:'#3b8aff'
    }
const style2={
  fontSize:'30px',
  color:'#3d4652'

}
  const playerRef = React.useRef(null);

  const videoJsOptions = {
   
  };
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };
    return(
        <>
        <div className="border-y-[1px] border-x-greytextfade pt-5  w-full -z-50">
            <div className="header flex flex-row justify-normal px-3 gap-3 ">
                <div className="img rounded-[50%] w-[40px] h-[40px]  m-0 ">
                <Link to={props.profileLink} className='rounded-[50%] w-[40px] h-[40px]  m-0'>
                 <img src={props.Profilesrc}  className={`p-0  w-full h-full  rounded-[50%] `}/>
                 </Link>
                </div>
                <div className="detailes w-full">
                    <div className="controls flex flex-row justify-between">
                       <ul className="flex flex-row justify-between w-auto">
                            <li className=" w-[max-content] text-[15px] text-greytextdark font-bold">
                            {props.author}
                            </li>
                            
                            {props.role=='doctor'|| props.role=='admin'?<li className="w-[max-content]"><div className="verified"><MdVerifiedUser style={style} color={'#3b8aff'} /></div></li>:''}
                        
                            <li className=" w-[max-content] text-[15px] text-greytextfade">
                            {props.time}
                            </li>
                       </ul>
                       <div className="postOperaions">
                        <ul className="">
                            {props.following ?<li className="w-[max-content] hover:bg-greytextfade p-2 "><RiUserFollowLine style={style}  className="icon-small"/></li>: <li className="w-[max-content] p-2 hover:bg-greytextfade"><RiUserUnfollowLine style={style} color="#726F6F"/></li>}
                           
                        </ul>
                       </div>
                    </div>
                    <div className="postText w-full">
                        <p className="m-0 p-0 text-[13px] lg:text-black lg:text-[15px]">{props.text}</p>
                    </div>
                    {props.file ?  <div className="postFile w-full rounded-[15px] border-[1px] border-greytextfade py-3 px-2">{props.fileType=='image'? <Image src={props.imageSrc}  />:<VideoJS options={{autoplay: false,controls: true,responsive: true,fluid: true,sources: [{src :props.videoSrc,type: props.videoType}]}}  onReady={handlePlayerReady} />}</div>:''}
              
                    <div className="postcontrol flex flex-row justify-between p-3">
                    <LiaCommentSolid style={style2} className="icon-small"/>
                    <CiShare1 style={style2} className="icon-small"/>
                    <RiAccountPinBoxLine style={style2} className="icon-small"/>
                    <RiDeleteBin4Line style={style2} className="icon-small"/>
                    </div>
                    
                </div>
                
                
            </div>
            <div className="comments w-full h-[500px] md:h-[600px] border-t-[1px] border-t-greytextfade">
                      <div className="chats p-3 h-[440px] md:h-[540px] overflow-y-auto overflow-x-hidden">
                         <MessageDoctor Chattext={props.Chattext} ChatsenderName={props.ChatsenderName} ChatSent={props.ChatSent} Chatfile={props.Chatfile} ChatimageSrc={props.ChatimageSrc} ChatvideoSrc={props.ChatvideoSrc} ChatvideoType={props.ChatvideoType} ChatfileType={props.ChatfileType} ChatsenderPicture={props.ChatsenderPicture} Cahttime={props.Cahttime} Chatsenderrole={props.Chatsenderrole}/>
                      </div>
                      <div className="input p-3  flex flex-row justify-between w-full  bg-gray-100 ">
                          <span className="h-[max-content] m-auto"><IoAttachSharp style={style2}/></span>
                            <input type="text" className="w-[75%] rounded-[20px] h-[45px] px-3 text-gray-800 "/>
                           <span className="h-[max-content] m-auto" > <AiOutlineAudio style={style2}/></span>
                           <span className="h-[max-content] m-auto"  >  <IoSend style={style2}/></span>        
                      </div>
                    </div>
            
        </div>
        </>
    )
}