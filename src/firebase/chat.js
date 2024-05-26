import { addDoc, collection, getDocs, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "./config";

// fucntion for creating a chat roon
export const getOrCreateChatRoom = async (doctorUid, motherUid) => {
    try {
      const chatRoomsRef = collection(db, 'chatRooms');
      const q = query(chatRoomsRef, where('participants', 'array-contains', doctorUid));
  
      const querySnapshot = await getDocs(q);
      let chatRoom = null;
  
      querySnapshot.forEach((doc) => {
        if (doc.data().participants.includes(motherUid)) {
          chatRoom = { id: doc.id, ...doc.data() };
        }
      });
  
      if (!chatRoom) {
        const chatRoomData = {
          participants: [doctorUid, motherUid],
          createdAt: serverTimestamp(),
        };
  
        const chatRoomRef = await addDoc(chatRoomsRef, chatRoomData);
        chatRoom = { id: chatRoomRef.id, ...chatRoomData };
      }
  
      return chatRoom;
  
    } catch (error) {
      console.error('Error getting or creating chat room:', error);
      throw new Error('Failed to get or create chat room');
    }
  };
  

//   function  for sending messages in chat rooom

export const sendMessage = async (chatRoomId, messageText) => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
  
    try {
      const messagesRef = collection(db, 'chatRooms', chatRoomId, 'messages');
      const messageData = {
        senderUid: user.uid,
        message: messageText,
        timestamp: serverTimestamp(),
      };
  
      await addDoc(messagesRef, messageData);
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  };
  
  // function for getting messages in chat room
  export const getMessages = async (chatRoomId) => {
    try {
      const messagesRef = collection(db, 'chatRooms', chatRoomId, 'messages');
      const q = query(messagesRef, orderBy('timestamp'));
      
      const querySnapshot = await getDocs(q);
      const messages = [];
      
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error('Failed to fetch messages');
    }
  };
