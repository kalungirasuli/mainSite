import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import HeadWithBack from "../microcomponents/HeadWithBack";
import { Input } from "../microcomponents/textComponents";
import { Button3 } from "../microcomponents/RoundedButton";
import axios from 'axios';

export default function Checkout() {
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

    const paymentDetails = {
      total: 100, // Example total amount
      phone: phoneNumber,
    };

    try {
      const response = await axios.post('http://localhost:3000/pay', paymentDetails);
      console.log('Payment Response:', response.data);
console.log("payment body is", response.data.paymentStatus)
console.log("paymenr status is ",response.data.paymentStatus.status )
      if (response.data.paymentStatus && response.data.paymentStatus.status === 'SUCCESSFUL') {
        window.location.href = 'http://localhost:3000';
      } else {
        console.error('Payment was not successful:', response.data);
    
      }
    } catch (error) {
      console.error('Error making payment request:', error);
     
    }
  };

  return (
    <>
      <div className="div">
        <HeadWithBack heading='Check out appointment' />
        <div className="div w-[90%] m-auto mt-10 shadow-lg rounded-lg pt-5">
          {/* summary of the booking */}
          <h2 className="w-[max-content] text-greytextafade m-auto text-[20px]">Booking summary</h2>
          <p className="flex flex-row text-greytextdark text-[20px] p-4 justify-evenly"><span className="font-bold text-greytextdark text-left">Pediatrician</span>:<span>{data.doctor}</span></p>
          <p className="flex flex-row text-greytextdark text-[20px] p-4 justify-evenly"><span className="font-bold text-greytextdark text-left">Mode</span>:<span>{data.mode}</span></p>
          <p className="flex flex-row text-greytextdark text-[25px] p-4 justify-evenly"><span className="font-bold text-greytextdark text-left">Time</span>:<span>{data.time}</span></p>
          <p className="flex flex-row text-greytextdark text-[20px] p-4 justify-evenly"><span className="font-bold text-greytextdark text-left">Date</span>:<span>{data.date}</span></p>
        </div>
        <form className="w-[90%] m-auto mt-[50px] pt-[100px]" onSubmit={handleClick}>
          { bookingDetails.mode == "Online" &&
          <div className="div pt-[50px]">
            <Input label='MTN Phone number' placeholder='Enter phone number (MTN)' value={phoneNumber} onChange={handlePhoneNumberChange} />
          </div>}
          <div className="div mt-5 w-full">
            <Button3 text='Check out' bg='bg-blue' color='text-white' rounded='rounded-[10px]' width='w-[90%] m-auto' onClick={handleClick} />
          </div>
        </form>
      </div>
    </>
  );
}
