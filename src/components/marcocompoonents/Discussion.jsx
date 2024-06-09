import React, { useEffect, useRef, useState } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, where, getDocs } from 'firebase/firestore';
import { HeadWithProfile } from "../microcomponents/HeadWithBack";
import { IoSend } from "react-icons/io5";
import { db } from '../../firebase/config';
import { useSelector } from 'react-redux';

const classes = {
  mother: 'rounded-l-[10px] rounded-b-[10px] w-[max-content] max-w-[80%] bg-smoke text-black',
  doctor: 'rounded-r-[10px] rounded-b-[10px] w-[max-content] max-w-[80%] bg-blue text-white',
  doctorPosition: 'flex items-start',
  motherPosition: 'flex items-start justify-end'
};

function MessageHolder({ message }) {
  const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div className={message.sender === 'doctor' ? classes.doctorPosition : classes.motherPosition}>
      <div className={message.sender === 'doctor' ? classes.doctor : classes.mother}>
        <p className='px-3 pt-3 text-left text-[16px] break-words'>{message.text}</p>
        <div className="time">
          <p className="text-right p-2 text-[12px]">{message.timestamp ? formatTimestamp(message.timestamp) : 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
}

export default function Discussion() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userType, setUserType] = useState(null);
  const inputRef = useRef(null);
  const messageEndRef = useRef(null);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    inputRef.current.focus();

    // Function to determine user type
    const determineUserType = async () => {
      if (user) {
        try {
          console.log("User ID: ", user);
          const uid = user;

          // Check if the user is a doctor
          const doctorQuery = query(collection(db, 'doctors'), where('uid', '==', uid));
          const doctorSnapshot = await getDocs(doctorQuery);

          if (!doctorSnapshot.empty) {
            setUserType('doctor');
            console.log("User is a doctor");
            return;
          }

          // Check if the user is a mother
          const motherQuery = query(collection(db, 'mothers'), where('uid', '==', uid));
          const motherSnapshot = await getDocs(motherQuery);

          if (!motherSnapshot.empty) {
            setUserType('mother');
            console.log("User is a mother");
          }
        } catch (error) {
          console.error("Error determining user type: ", error);
        }
      } else {
        console.log("No user found");
      }
    };

    determineUserType();

    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs);
    }, (error) => {
      console.error("Error fetching messages: ", error);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && userType) {
      try {
        await addDoc(collection(db, "messages"), {
          sender: userType,
          text: newMessage,
          timestamp: serverTimestamp(),
        });
        setNewMessage('');
        inputRef.current.focus();
        console.log("Message sent successfully");
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    } else {
      console.log("Message is empty or userType is not set");
    }
  };

  return (
    <>
      <HeadWithProfile heading='Messages' />
      <div className="div w-full space-y-4 h-full flex justify-between relative overflow-hidden ">
        <div className="message p-5 h-full w-full overflow-y-auto pb-20">
          {messages.map((msg) => (
            <MessageHolder key={msg.id} message={msg} />
          ))}
          <div ref={messageEndRef}></div>
        </div>
        <form onSubmit={sendMessage} className="input flex gap-[10px] w-full bg-gray-500 p-2 absolute bottom-0">
          <input
            type="text"
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full h-[45px] rounded-[10px] p-2 outline-0"
          />
          <button type="submit">
            <IoSend className="fill-black focus:fill-blue" style={{ fontSize: '30px' }} />
          </button>
        </form>
      </div>
    </>
  );
}
