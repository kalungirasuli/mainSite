import DoctorListcard from "../microcomponents/DoctorListcard"
import HeadWithBack from "../microcomponents/HeadWithBack"

export default function DoctorAll(){
    return(
        <>
        <div className="div">
            <HeadWithBack heading='Pedetriciations list'/>
            <div className="div">
                <DoctorListcard/>
            </div>  
        </div>
        </>
    )
}