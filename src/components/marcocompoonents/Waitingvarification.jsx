import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { styles, buttonStyle } from "../microcomponents/textComponents";
import HeaderLogo from "../microcomponents/HeaderLogo";
import { Button3 } from "../microcomponents/RoundedButton";

export default function WaitingVerification() {
  const message = {
    mother: "To ensure your account's security and enable us to communicate effectively, please verify your email address. Check your inbox for our verification email. If not received, check spam.",
    doctor: "Your documents are currently under verification. We appreciate your patience and will respond by sending you an email soon. Thank you.",
  };
  const buttontext = {
    mother: 'Resend message',
    doctor: 'Cancel submission',
  };
  const altbuttontext = {
    out: 'Sign out of this account',
    in: 'Sign in with another account',
  };

  const userRole = useSelector((state) => state.auth.role);
  const [user, setUser] = useState('');
  const [color, setColor] = useState('');
  const [bg, setBg] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (userRole === 'doctor') {
      setUser(userRole);
      setColor('text-white');
      setText(buttontext.doctor);
      setBg('bg-redlight');
    } else {
      setUser(userRole);
      setColor('text-blue');
      setText(buttontext.mother);
      setBg('bg-bluebutton');
    }
  }, [userRole]);

  return (
    <div className={`${styles}`}>
      <HeaderLogo head='Neonates' />
      <div className={`${buttonStyle} bg-white rounded-[10px] shadow-lg p-5 mt-5`}>
        <p className="text-[13px] text-greytextdark md:text-[20px] ">
          {user === 'mother' ? message.mother : message.doctor}
        </p>
        <Button3 width='w-[60%] mt-5' color={color} bg={bg} text={text} />
      </div>
      {user === 'doctor' ? (
        <div className={`${buttonStyle} mt-5`}>
          <Button3 width='w-full' color='text-blue' bg='bg-bluebutton' text={altbuttontext.in} />
          <p className="text-center text-greytextdark text-[15] my-2"> or</p>
          <Button3 width='w-full' color='text-white' bg='bg-blue' text={altbuttontext.out} />
        </div>
      ) : (
        <div className="progress-bar flex flex-row absolute bottom-[100px] left-0 right-0 w-[70%] m-auto lg:w-[50%] bg-greytextfade xl:w-[40%]">
          <hr className='bg-blue h-2 w-[20%]' />
        </div>
      )}
    </div>
  );
}
