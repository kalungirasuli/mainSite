import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedDoctor } from '../../redux/userSlice';

export default function DoctorListcard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserClick = () => {
    dispatch(setSelectedDoctor({
      id: props.id,
      firstName: props.firstName,
      secondName: props.secondName,
      work: props.work,
     
      online: props.online,
    }));
    navigate(props.link);
  };

  return (
    <div onClick={handleUserClick}>
      <div className="div p-3 pt-5 shadow-lg rounded-[10px] w-[160px] mt-5 cursor-pointer">
        <div className="div w-[60px] m-auto relative -z-50">
          <img src={props.image} className="rounded-full w-[50px] h-[50px] m-auto" loading="lazy" alt="" />
          {props.online && <span className="absolute top-[5px] right-[2px]"><FaCircle className="fill-green-700" /></span>}
        </div>
        <p className="font-bold text-black text-[15px] text-center pt-2">Dr.{props.name}</p>
        <p className="text-greytextfade text-center text-[14px] p-2">{props.work}</p>
        <div className="div w-[max-content] m-auto">
          <button className="font-bold bg-greenbutton text-center p-2 px-3 rounded-[10px] w-[max-content] m-auto">Appointment</button>
        </div>
      </div>
    </div>
  );
}
