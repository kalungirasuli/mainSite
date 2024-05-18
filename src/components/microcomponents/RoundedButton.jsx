import { Link } from "react-router-dom"


export default function RoundedButton(props){
    return(
        <>
            <div className="div w-full p-0">
            <Link to={props.link} className="w-full p-0">
            <button type={props.type} onClick={props.onClick} className="text-white bg-blue p-3 rounded-[30px] w-full text-[20px]">{props.text}</button>
            </Link>  
            </div>
        </>
    )
}

export function Button3(props){
    return(
        <>
            <div className={` ${props.width} p-0`}>
            <Link to={props.link} className="w-full p-0">
            <button type={props.type} onClick={props.onClick} className={` ${props.bg} ${props.color} p-3 rounded-[30px] w-full text-[15px] md:text-[20px]`}>{props.text}</button>
            </Link>  
            </div>
        </>
    )
}
