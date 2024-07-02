import { useState } from 'react';
import { Outlet, Link, useLocation, useParams } from 'react-router-dom';
import { IoCalendarSharp, IoHomeSharp, IoPerson, IoAddSharp, IoSearch } from 'react-icons/io5';
import { MdMessage } from 'react-icons/md';
import { Button3 } from '../microcomponents/RoundedButton';
import SavePost from './SavePost';

export default function HomeTemp() {
  const [showSavePost, setShowSavePost] = useState(false);
  const location = useLocation();
  const { id } = useParams();

  // Check if the current pathname matches "/Message/:id"
  const isMessagesRoute = location.pathname === `/Message/${id}`;

  // Function to toggle SavePost visibility
  const toggleSavePost = () => {
    setShowSavePost(!showSavePost);
  };
   
  const windowClose=(event)=>{
    // Check if the clicked target has class 'hello'
    if (!event.target.classList.contains('search')) {
      setShowSavePost(false);
    }
  }
   document.addEventListener('click', windowClose);
  // Function to hide SavePost on clicking anywhere on the screen
  const handleClickOutside = () => {
    if (showSavePost) {
      setShowSavePost(false);
    }
  };

  return (
    <>
      <div className="containing flex flex-cols-3 h-screen w-full bg-white xxl:w-[80%] border-x-[1px] border-x-greytextfade m-auto">
        <div
          className={`left transition-opacity duration-500 ${
            isMessagesRoute ? 'hidden' : 'block'
          } fixed bottom-0 left-0 right-0 md:block md:p-[1px] md:border-r-[1px] md:border-r-greytextfade md:w-[100px] md:sticky md:top-0 md:px-3 md:h-screen xl:w-[23%]`}
        >
          <div className="div logo align-left w-[max-content] p-3 rounded-[50%] hover:bg-greytextfade hidden md:block md:m-auto xl:m-0">
            <svg
              id="Layer_2"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[70px] md:w-[40px]"
              viewBox="0 0 149 153.49"
            >
              <g id="Layer_1-2">
                <g>
                  <g>
                    <rect x="1" y="1" width="147" height="151.49" rx="22.76" ry="22.76" fill="#fff" />
                    <path
                      d="m125.24,2c12,0,21.76,9.76,21.76,21.76v105.96c0,12-9.76,21.76-21.76,21.76H23.76c-12,0-21.76-9.76-21.76-21.76V23.76C2,11.76,11.76,2,23.76,2h101.47m0-2H23.76C10.64,0,0,10.64,0,23.76v105.96c0,13.12,10.64,23.76,23.76,23.76h101.47c13.12,0,23.76-10.64,23.76-23.76V23.76c0-13.12-10.64-23.76-23.76-23.76h0Z"
                      fill="#29abe2"
                    />
                  </g>
                  <g>
                    <g>
                      <rect x="30.92" y="64.45" width="87.17" height="24.59" fill="#3b8aff" />
                      <path
                        d="m117.08,65.45v22.59H31.92v-22.59h85.17m2-2H29.92v26.59h89.17v-26.59h0Z"
                        fill="#fff"
                      />
                    </g>
                    <g>
                      <rect x="62.59" y="31.82" width="23.81" height="89.85" fill="#3b8aff" />
                      <path
                        d="m85.41,32.82v87.85h-21.81V32.82h21.81m2-2h-25.81v91.85h25.81V30.82h0Z"
                        fill="#fff"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <ul className="flex flex-row justify-between z-50 bg-white border-t-[1px] border-t-greytextfade md:flex-col md:border-t-0">
            <Link to="" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
              <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade flex flex-row gap-5">
                <IoHomeSharp className="icon" />
                <span className="text-center hidden text-[20px] xl:block">Home</span>
              </li>
            </Link>
            <Link to="/appointment" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
              <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade flex flex-row gap-5">
                <IoCalendarSharp className="icon" />
                <span className="text-center hidden text-[20px] xl:block">Appointment</span>
              </li>
            </Link>
            <Link to="/Message" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
              <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade flex flex-row gap-5">
                <MdMessage className="icon" />
                <span className="text-center hidden text-[20px] xl:block">Messages</span>
              </li>
            </Link>
            <Link to="/profile" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0">
              <li className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade flex flex-row gap-5">
                <IoPerson className="icon" />
                <span className="text-center hidden text-[20px] xl:block">Profile</span>
              </li>
            </Link>
            <div className=" search p-0 w-[max-content] m-auto xl:hidden">
              <li
                className="p-3 w-[max-content] rounded-[30px] hover:bg-greytextfade flex flex-row gap-5"
                onClick={toggleSavePost}
              >
                <IoSearch className="icon" />
              </li>
            </div>
            <Link to="/add-post" className="p-0 w-[max-content] m-auto xl:w-full xl:m-0 xl:block">
              <li className="py-3 max-w-[200px]">
                <div className="w-[max-content] bg-blue p-4 rounded-[50%] xl:hidden">
                  <IoAddSharp className="icon white" />
                </div>
                <Button3 type="button" bg="bg-blue" color="text-white" link="/add-post" text="Post" rounded="w-[100px] rounded-[30px] hidden xl:block" />
              </li>
            </Link>
            <div className=""></div>
          </ul>
        </div>
        <div className="main w-full h-screen pb-[80px] overflow-hidden md:w-[80%] md:pb-0 md:border-r-[1px] md:border-r-greytextfade xl:w-[50%]">
          <Outlet />
        </div>
        <div
          className={`savedPost p-4 ${showSavePost ? 'block absolute right-0 top-0 w-[90%] h-full bg-white shadow-xl md:w-[50%]' : 'hidden '} lg:block lg:static lg:w-[30%] lg:shadow-none `}
          onClick={handleClickOutside}
        >
        <SavePost />
        </div>
      </div>
    </>
  );
}
