import { useState } from 'react';
import { useSelector } from 'react-redux';
import HeadWithBack from "../microcomponents/HeadWithBack";
import { Input } from "../microcomponents/textComponents";
import { Button3 } from "../microcomponents/RoundedButton";
import axios from 'axios';
import { useLocation } from 'react-router-dom';


export default function Checkout() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookingId = searchParams.get('bookingId');
  
  const selectedDoctor = useSelector(state => state.user.selectedDoctor);
  const bookingDetails = useSelector(state => state.user.bookingDetails);

  const [phoneNumber, setPhoneNumber] = useState('');

  const data = {
    doctor: `${selectedDoctor.firstName} ${selectedDoctor.secondName}`,
    mode: bookingDetails.mode,
    time: bookingDetails.time,
    date: bookingDetails.day,
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
console.log('the booking is', bookingId)
    const paymentDetails = {
      total: 100, // Example total amount
      phone: phoneNumber,
      bookingId, // Include the booking ID
    };

    try {
      const response = await axios.post('http://localhost:3000/pay', paymentDetails);
      // console.log('Payment Response:', response.data);
       data.mode==='Online'?generateMeetLink(data.mode):generateMeetId(data.mode);
       const generateMeetLink=()=>{
        if(response.data.paymentStatus && response.data.paymentStatus.status === 'SUCCESSFUL' && data.mode === 'Online') {
          window.location.href = `http://localhost:3000/?bookingId=${bookingId}`;
        } else {
          console.error('Payment was not successful:', response.data);
        }}
        const generateMeetId=()=>{
          if(response.data.paymentStatus && response.data.paymentStatus.status === 'SUCCESSFUL' && data.mode === 'Physical') {
            //generate meet id instead and save to fire base 
          } else {
            console.error('Payment was not successful:', response.data);
          }
        }
    } catch (error) {
      console.error('Error making payment request:', error);
    }
  };

  return (
    <>
      <div className="div">
        <HeadWithBack heading='Check out appointment' />
        <div className="div w-[90%] m-auto mt-10 border-solid border-[1px] border-greytextfade rounded-lg p-5">
          {/* summary of the booking */}
          <div className=" summa p-2 text-center border-solid border-[1px] border-greytextfade rounded-lg ">
            <h3 className='text-greytextfade p-0 m-0 text-[20px] '>Booking summary</h3>
          </div>
          <div className="div pt-3 flex justify-evenly gap-2">
          <div className="div text-center w-[50%] border-solid border-[1px] border-greytextfade rounded-lg ">
            <ul className='flex flex-col gap-2 p-2'>
              <li className='text-greytextdark text-[15px] p-3 w-full rounded-lg  transition-all duration-100  hover:scale-100  hover:bg-smoke md:text-[20px]'>Doctor</li>
              <li className='text-greytextdark text-[15px] p-3 w-full rounded-lg  transition-all duration-100  hover:scale-100  hover:bg-smoke md:text-[20px]'>Date</li>
              <li className='text-greytextdark text-[15px] p-3 w-full rounded-lg  transition-all duration-100  hover:scale-100  hover:bg-smoke md:text-[20px]'>Time</li>
              <li className='text-greytextdark text-[15px] p-3 w-full rounded-lg  transition-all duration-100  hover:scale-100  hover:bg-smoke md:text-[20px]'>Mode</li>
            </ul>
          </div>
          <div className="div text-center w-[50%] border-solid border-[1px] border-greytextfade rounded-lg">
            {
              data&&(
                <ul className='flex flex-col gap-2 p-2'>
              <li className='text-greytextdark text-[15px] p-3 w-full rounded-lg  transition-all duration-100  hover:scale-100  hover:bg-smoke md:text-[20px]'>{data.doctor}</li>
              <li className='text-greytextdark text-[15px] p-3 w-full rounded-lg  transition-all duration-100  hover:scale-100  hover:bg-smoke md:text-[20px]'>{data.date}</li>
              <li className='text-greytextdark text-[15px] p-3 w-full rounded-lg  transition-all duration-100  hover:scale-100  hover:bg-smoke md:text-[20px]'>{data.time}</li>
              <li className='text-greytextdark text-[15Spx] p-3 w-full rounded-lg  transition-all duration-100  hover:scale-100  hover:bg-smoke md:text-[20px]'>{data.mode}</li>
            </ul>
              )
            }
          </div>
          </div>
         </div>
        <form className="w-[90%] m-auto mt-[20px] rounded-lg border-solid border-[1px] border-greytextfade p-3" onSubmit={handleClick}>
        <div className=" summa p-2 text-center border-solid border-[1px] border-greytextfade rounded-lg ">
            <h3 className='text-greytextfade p-0 m-0 text-[20px] '>Enter billing address</h3>
          </div>
          <div className="div pt-[50px]">
            <Input label='MTN Phone number' placeholder='Enter phone number (MTN)' value={phoneNumber} onChange={handlePhoneNumberChange} />
          </div>
          <div className="div mt-5 w-full">
            <Button3 text='Check out' bg='bg-blue' color='text-white' rounded='rounded-[10px]' width='w-[90%] m-auto' onClick={handleClick} />
          </div>
        </form>
      </div>
    </>
  );
}
