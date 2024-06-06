import HeadWithBack from "../microcomponents/HeadWithBack";
import { Input } from "../microcomponents/textComponents";
import { IoPerson } from "react-icons/io5";
import { ProfileImage } from "../microcomponents/textComponents";
export default function DoctorProfile() {
    return (
        <>
            <HeadWithBack heading=" Profile" />
            <div className="img w-[50px] h-[50px]  relative m-auto mt-[50px] md:w-[100px] md:h-[100px]">
                <div className="div absolute bottom-0 right-[10px]  bg-white p-2 rounded-full w-[max-content]"><ProfileImage/></div>
                    <img src="https://picsum.photos/200/300" alt="" className="w-full h-full rounded-full" />
                    
                </div>
                <form action="">
                   <Input  />
                </form>
        </>
    );
}