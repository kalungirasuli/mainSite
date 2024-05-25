import DoctorListcard from "../microcomponents/DoctorListcard"


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