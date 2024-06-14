import { Link } from "react-router-dom"


export default function RoundedButton({link,text,onClick,type,bg}){
    return(
        <>
        <Link to={link} className="w-full p-0">
            <div className="div w-full p-0">
            
            <button type={type} onClick={onClick} className={`${bg?'bg-red-500':'bg-blue'} text-white  p-3 rounded-[30px] w-full text-[20px]`}>{text}</button>
             
            </div>
            </Link>
        </>
    )
}


export function Button3(props) {
    return (
        <>
            <div className={` ${props.width} p-0`}>
                <Link to={props.link} className="w-full p-0">
                    <button type={props.type} onClick={props.onClick} className={` ${props.bg} ${props.color}  ${props.rounded?props.rounded:'rounded-[30px]'} p-3 w-full text-[15px] md:text-[20px]`}>
                        {props.text}
                    </button>
                </Link>
            </div>
        </>
    );
}
