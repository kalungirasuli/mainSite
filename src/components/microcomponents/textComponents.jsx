import { Link } from "react-router-dom"
export function Alt(props){
    return(
        <>
         <Link to={props.link} onClick={props.onclick} className="m-auto p-0 text-center w-[200px] ">
            <p className="flex flex-row gap-[5px] justify-center text-center p-3 w-[200px] m-auto">
                <span className="text-blue text-center text-[15px]">{props.highlightText}</span>
                <span className="text-greytestdark text -center text-[15px]">{props.endText}</span>
            </p>
         </Link>
        </>
    )
}
export const styles=' lg:bg-white lg:shadow-xl lg:rounded-[20px] lg:p-[50px] lg:w-[max-content] lg:m-auto lg:mt-[20] xl:mt-5'
export const buttonStyle='w-[300px] m-auto pt-[20px] md:w-[450px]'
export function Input(props) {
    return (
        <div className="div flex flex-col gap-2 w-[300px] m-auto pt-[20px] md:w-[450px]">
            <label htmlFor={props.for} className="text-[15px] text-greytextdark text-left pl-3">{props.label}</label>
            <input 
                type={props.type} 
                placeholder={props.placeholder} 
                id={props.ids} 
                value={props.value} 
                name={props.name} 
                className={`${props.classes} rounded-[10px] p-3 shadow-md w-[100%] text-center`} 
                onChange={props.onChange}
            />
        </div>
    );
}

export function File(props) {
    return (
        <div className="flex flex-col gap-2 w-[300px] m-auto pt-[20px] md:w-[450px]">
            <label htmlFor={props.for} className="text-[15px] text-greytextdark text-left pl-3">
                {props.label}
            </label>
            <input
                type={props.type}
                id={props.ids}
                name={props.name}
                className={`${props.classes} rounded-[10px] p-3 shadow-md w-[100%]`}
                onChange={props.onChange}
            />
        </div>
    );
}
