export default function RoundedButtonTwo(props){
    return(
        <>
       
            <div className="div w-full p-0">
            
            <button type={props.type} onClick={props.onClick} className={ `${props.bg?'bg-red-500':'bg-blue'}text-white  p-3 rounded-[30px] w-full text-[20px]`}>{props.text}</button>
             
            </div>
          
        </>
    )
}