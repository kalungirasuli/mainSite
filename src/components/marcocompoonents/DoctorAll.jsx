import DoctorListcard from "../microcomponents/DoctorListcard"
import HeadWithBack from "../microcomponents/HeadWithBack"
import { Search } from "../microcomponents/textComponents"

export default function DoctorAll(){
    return(
        <>
        <div className="div">
            <HeadWithBack heading='Pedetriciations list'/>
            <div className="div">
            <div className="div p-3 h-auto">
                <Search type='text' placeholder='Search a pedetriciation' ids='search' classes='rounded-[10px] p-3 w-full border-0 text-left text-[15px] outline-none'/>
            </div>
              <div className="div w-[90%] m-auto flex flex-wrap justify-between gap-[10px] pt-5">
                {/* the props are, name, work, link, image, online is aboolean */}
              <DoctorListcard/>
              </div>
            </div>  
        </div>
        </>
    )
}