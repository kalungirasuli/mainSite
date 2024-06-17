import { FaAngleLeft} from "react-icons/fa6"
import HeadWithBack from "./HeadWithBack"

export default function HeaderLogo(props){
    const style={
        fontSize:'20px'
    }
    return(
        <>
            <div className="div relative">
            <HeadWithBack border />
            </div>
            <div className="top mt-[10px] md:mt-[30px] lg:mt-[50px] xl:mt-[30px]" >
            <div className="div logo w-[70px] m-auto md:w-[100px]">
            <svg id="Layer_2" xmlns="http://www.w3.org/2000/svg"className='w-[70px] md:w-[100px] ' viewBox="0 0 149 153.49"><g id="Layer_1-2"><g><g><rect x="1" y="1" width="147" height="151.49" rx="22.76" ry="22.76" fill="#fff"/><path d="m125.24,2c12,0,21.76,9.76,21.76,21.76v105.96c0,12-9.76,21.76-21.76,21.76H23.76c-12,0-21.76-9.76-21.76-21.76V23.76C2,11.76,11.76,2,23.76,2h101.47m0-2H23.76C10.64,0,0,10.64,0,23.76v105.96c0,13.12,10.64,23.76,23.76,23.76h101.47c13.12,0,23.76-10.64,23.76-23.76V23.76c0-13.12-10.64-23.76-23.76-23.76h0Z" fill="#29abe2"/></g><g><g><rect x="30.92" y="64.45" width="87.17" height="24.59" fill="#3b8aff"/><path d="m117.08,65.45v22.59H31.92v-22.59h85.17m2-2H29.92v26.59h89.17v-26.59h0Z" fill="#fff"/></g><g><rect x="62.59" y="31.82" width="23.81" height="89.85" fill="#3b8aff"/><path d="m85.41,32.82v87.85h-21.81V32.82h21.81m2-2h-25.81v91.85h25.81V30.82h0Z" fill="#fff"/></g></g></g></g></svg>
            </div>
            <div className='text-center text-bluegreen text-[20px] mt-2 md:text-[40px] '>
                <p className="w-[max-content] m-auto text-center">{props.head}</p>
            </div>
            <div className="div text-center pt-2">
                <p className="text-greytextdark text-[15px] w-[max-content m-0 md:text-[20px] ">
                    {props.text}
                </p>
            </div>
            </div>
        </>
    )
}