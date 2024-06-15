import { useState, useEffect } from "react";
import { BiSolidMessageError } from "react-icons/bi";
import { Link } from "react-router-dom";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import HeadWithBack from "../microcomponents/HeadWithBack";
import { useSelector } from "react-redux";

const MessageListCard = ({room, senderName, senderImage, time, preview, status }) => {
  // Truncate the message preview if necessary
  const truncatedPreview = preview.length > 50 ? preview.slice(0, 50) + "..." : preview;

  return (
    <Link to={`/Message/${room}`}>
      <div className="bg-white w-full shadow-md border-solid border-2 border-greytextfade p-4 rounded-lg mb-4 flex items-center relative" title={preview}>
        <img src={senderImage} alt={senderName} className="h-10 w-10 rounded-full mr-4" />
        {/* Display new message icon if there's a new message */}
        {status && (
          <span className="absolute top-2 right-2">
            <BiSolidMessageError className="fill-reddark" style={{ fontSize: "20px" }} />
          </span>
        )}
        <div className="w-full">
          <div className="flex items-center mb-1">
            <h3 className="text-gray-800 font-medium">{senderName}</h3>
          </div>
          <p className="text-gray-600 text-sm">{truncatedPreview}</p>
          <p className="text-gray-500 text-sm ml-2 text-right">{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default function MessageRooms() {
  const [messageRooms, setMessageRooms] = useState([]);
  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    // Function to fetch message rooms and their last messages
    const fetchMessageRooms = async () => {
      try {
        if (!user) return; // Exit early if user is not available

        // Query to fetch message rooms where the logged-in user is a participant
        const q = query(collection(db, "messageRooms"), where("users", "array-contains", user));

        // Fetch the message rooms
        const querySnapshot = await getDocs(q);

        // Iterate through each message room
        const roomsData = [];
        for (const doc of querySnapshot.docs) {
          const roomData = doc.data();

          // Fetch the last message for the room
          const lastMessageQuery = query(
            collection(db, "messages"),
            where("roomId", "==", doc.id),
            orderBy("timestamp", "desc"),
            limit(1)
          );
          const lastMessageSnapshot = await getDocs(lastMessageQuery);
          const lastMessage = lastMessageSnapshot.docs[0]?.data();

          // If a last message exists, add it to the room data
          if (lastMessage) {
            roomsData.push({
              id: doc.id,
              senderName: lastMessage.senderName,
              senderImage: lastMessage.senderImage,
              time: lastMessage.time,
              preview: lastMessage.text,
              status: lastMessage.status // Assuming this indicates if the message is new or not
            });
          }
        }

        // Set the message rooms state with the fetched data
        setMessageRooms(roomsData);
        console.log( 'the room data is ',roomsData);
      } catch (error) {
        console.error("Error fetching message rooms:", error);
      }
    };

    // Call the fetchMessageRooms function
    fetchMessageRooms();
  }, [user]); // Add user as a dependency

  return (
    <>
      <HeadWithBack heading="Message Rooms" />
      <div className="p-10 flex flex-col">
        {/* Render message cards for each message room */}
        {messageRooms.map((room) => (
          <MessageListCard
            key={room.id}
            room={room.id}
            senderName={room.senderName || "Joe Doe"}
            senderImage={room.senderImage || "https://picsum.photos/id/100/200/300"}
            time={room.time || new Date().toLocaleTimeString()}
            preview={room.preview || "hey"}
            status={room.status || true}
          />
        ))}
      </div>
    </>
  );
}
