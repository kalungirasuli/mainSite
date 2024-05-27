import { Search } from "./textComponents"
import HeadWithBack from "./HeadWithBack"
export default function DoctorListcard(){
    return(
        <>
         <HeadWithBack heading='Pedetriciations list'/>
            <div className="div">
                <Search type='text' placeholder='Search a pedetriciation' ids='search' classes='rounded-[10px] p-3 shadow-md w-full border-0 text-left text-[15px]'/>
            </div>

        </>
    )
}

