import { IoSearchSharp } from 'react-icons/io5';
import { IoIosImages } from "react-icons/io";
export default function SavePost() {
    return(
        <>
            <label htmlFor='search' className="div p-2 px-5 rounded-full boder-solid border-[1px] border-greytextfade outline-[1px] outline-greytextfade flex justify-between gap-2">
            <span className="w-[max-content] h-[max-content] m-auto">
            <IoSearchSharp className='text-greytextdark icon'/>
            </span>
            <input type="search" name="" placeholder='Search archive' id="search" className="w-full h-[30px] rounded-full outline-none" />
            </label>
                   
            <div className="div mt-5">
               <PostSaved/>
            </div>
        </>
    )
}


function PostSaved(){
    return(
        <>
        <div className="div border-solid border-[1px] border-greytextfade rounded-[10px] p-2">
          <div className="div relative">
            <div className="div flex flex-row gap-2">
              <div className="div w-[50px] h-[50px] rounded-[50%] bg-greytextfade">
                {/* the aurthers image */}
                <img src="https://picsum.photos/200" alt="HB" className='text-[20px] text-greytexdark text-center m-auto w-[50px] h-[50px] rounded-full' loading='lazy'/>
              </div>
              <div className="div flex flex-col ">
                {/* the posters name or arthur */}
                <span className="text-[15px] font-bold">John Doe</span>
                {/* the time of the post */}
                <span className="text-[12px] text-greytext">2 hours ago</span>
              </div>
            </div>
            {/* the text of the post jst afew  charters to show how post */}
            <div className="div p-2">
              <p className="text-[15px] text-greytextdark">
                Lorem ipsum dolor sit amet consec...
              </p>

            </div>
            {/* the icon appears if the post hold a file of image type  */}
            <span className='absolute top-3 right-3 w-[max-content] h-[max-content]'>
            <IoIosImages className='text-greytextdark text-[20px] '/>
            </span>
          </div>
        </div>
        </>
    )
}