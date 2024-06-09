
import HeadWithBack from "../microcomponents/HeadWithBack"
import { useState,useEffect } from "react";
import { BiSolidMessageError } from "react-icons/bi";
import { Link } from "react-router-dom";
const MessageListCard = ({ senderName, senderImage, time, preview,fullMessage ,status}) => {
    // the senders name first character
    const [name,setname]=useState(senderName)
      useEffect(()=>{
        setname(senderName.split(' ')[0][0].toUpperCase() + senderName.split(' ')[1][0].toUpperCase())
        }
        ,[])
    // the message preview should be 50characters long
    preview = preview.length > 50 ? preview.slice(0, 50) + '...' : preview
    return (
      <>
        <Link to="/Message/1" >
        <div className="bg-white w-full shadow-md border-solid border-2 border-greytextfade p-4 rounded-lg mb-4 flex items-center relative" title={fullMessage}>
        <img
          src={senderImage}
          alt={name}
          className="h-10 w-10 rounded-full mr-4"
        />
        {/* this checks if theirs a new message and displays a message icon */}

       {
              status && (
                <span className="absolute top-2 right-2">
                <BiSolidMessageError  className="fill-reddark" style={{fontSize:"20px"}}/>
                </span>
              )
       }
        <div  className="w-full">
          <div className="flex items-center mb-1 ">
            <h3 className="text-gray-800 font-medium">{senderName}</h3> 
          </div>
          <p className="text-gray-600 text-sm">{preview}</p>
          <p className="text-gray-500 text-sm ml-2 text-right">{time}</p>
        </div>
      
      </div>
        </Link>
      </>
    );
  };

export default function MessageRooms(){

    return(
        <>
            <HeadWithBack heading="Message Rooms"/>
            <div className="div p-10 flex flex-col">
                {/* these are the message rooms listed in cards */}
                <MessageListCard
                    senderName="John Doe"
                    senderImage="https://picsum.photos/id/100/200/300"
                    time={new Date().toLocaleTimeString()}
                    preview="Hello, how are you?..."
                    fullMessage={'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum repellendus cupiditate officia animi, hic commodi maxime nihil, sunt magnam aliquid cum repudiandae quae inventore consectetur porro molestias doloremque aperiam! Officia labore, exercitationem quas nihil vero quos mollitia sint, at nulla, laudantium explicabo. Recusandae, nam beatae. Fuga voluptatibus temporibus sunt id eveniet accusamus. In culpa nemo, nesciunt voluptatibus quibusdam architecto veniam aperiam adipisci neque facilis explicabo voluptatum eligendi, cum aliquam eius qui doloribus voluptas natus! Quas, laborum facere quod dolorem velit architecto necessitatibus harum, quibusdam numquam adipisci sunt exercitationem illo rem earum ex, saepe iste mollitia nam non ab? Laborum, ad?'}
                    status={true}
                    />
            </div>
        </>
    )
}