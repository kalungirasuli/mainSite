

export default function TimeFormater(props) {
    // Helper function to format time to "x time ago" or specific date/time format
    const formatTimeAgo = (timestamp) => {
      if (!timestamp) {
        return ''; // Handle case where timestamp is not provided
      }
  
      const currentDate = new Date();
      const sentDate = new Date(timestamp);
  
      // Calculate the difference in milliseconds
      const difference = currentDate - sentDate;
      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
  
      if (minutes < 60) {
        return `${minutes}m ago`;
      } else if (hours < 24) {
        return `${hours}hr ago`;
      } else if (days === 1) {
        const formattedTime = formatAMPM(sentDate);
        return `Yesterday, ${formattedTime}`;
      } else if (days === 2) {
        const formattedTime = formatAMPM(sentDate);
        return `2 days ago, ${formattedTime}`;
      } else if (days === 3) {
        const formattedTime = formatAMPM(sentDate);
        return `3 days ago, ${formattedTime}`;
      } else {
        const formattedDate = `${sentDate.getDate()}/${sentDate.getMonth() + 1}/${sentDate.getFullYear()}`;
        const formattedTime = formatAMPM(sentDate);
        return `${formattedDate} ${formattedTime}`;
      }
    };
  
    // Helper function to format time to AM/PM format
    const formatAMPM = (date) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      const strTime = `${hours}:${minutes}${ampm}`;
      return strTime;
    };
  
    // Example usage: Check if props.timestamp is defined
    const timestamp = props.timestamp;
    if (!timestamp) {
      return null; // or handle appropriately if timestamp is not provided
    }
  
    const formattedTime = formatTimeAgo(timestamp);
  
    return (
      <li className="w-[max-content] text-[15px] text-greytextdark font-bold">
        {formattedTime}
      </li>
    );
  }
  