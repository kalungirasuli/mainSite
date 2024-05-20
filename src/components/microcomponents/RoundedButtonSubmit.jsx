export default function RoundedButtonTwo(props){
    return(
        <>
       
            <div className="div w-full p-0">
            
            <button type={props.type} onClick={props.onClick} className="text-white bg-blue p-3 rounded-[30px] w-full text-[20px]">{props.text}</button>
             
            </div>
          
        </>
    )
}