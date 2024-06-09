
import HeadWithBack from "../microcomponents/HeadWithBack"

const MessageListCard = ({ senderName, senderImage, time, preview,fullMessage }) => {
    // the senders name first character
    senderName = senderName.split(' ')[0][0].toUpperCase() + senderName.split(' ')[1][0].toUpperCase();
    return (
      <div className="bg-white shadow-md p-4 rounded-lg mb-4 flex items-center" title={fullMessage}>
        <img
          src={senderImage}
          alt={}
          className="h-10 w-10 rounded-full mr-4"
        />
        <div>
          <div className="flex items-center mb-1">
            <h3 className="text-gray-800 font-medium">{senderName}</h3>
            <span className="text-gray-500 text-sm ml-2">{time}</span>
          </div>
          <p className="text-gray-600 text-sm">{preview}</p>
        </div>
      </div>
    );
  };

export default function MessageRooms(){

    return(
        <>
            <HeadWithBack heading="Message Rooms"/>
            <div className="div">
                {/* these are the message rooms listed in cards */}
                <MessageListCard
                    senderName="John Doe"
                    senderImage="https://randomuser.me/api/port"
                    time={new Date().toLocaleTimeString()}
                    preview="Hello, how are you?..."
                    fullMessage={'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum repellendus cupiditate officia animi, hic commodi maxime nihil, sunt magnam aliquid cum repudiandae quae inventore consectetur porro molestias doloremque aperiam! Officia labore, exercitationem quas nihil vero quos mollitia sint, at nulla, laudantium explicabo. Recusandae, nam beatae. Fuga voluptatibus temporibus sunt id eveniet accusamus. In culpa nemo, nesciunt voluptatibus quibusdam architecto veniam aperiam adipisci neque facilis explicabo voluptatum eligendi, cum aliquam eius qui doloribus voluptas natus! Quas, laborum facere quod dolorem velit architecto necessitatibus harum, quibusdam numquam adipisci sunt exercitationem illo rem earum ex, saepe iste mollitia nam non ab? Laborum, ad?'}

                    />
            </div>
        </>
    )
}