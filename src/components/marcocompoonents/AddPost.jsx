import HeadWithBack from "../microcomponents/HeadWithBack";
import { TextArea,FilePicker} from "../microcomponents/textComponents";

export default function AddPost(){
    return(
        <>
        <div className="div">
            <HeadWithBack heading='Add Post'/>
            <div className="div w-full">
                <form className="form">
                 <TextArea placeholder='Write your post here' ids='post' classes='rounded-[10px] p-3 shadow-md w-full border-0 text-left text-[15px]'/>
                 <FilePicker/>
                </form>
            </div>
            </div>
        </>
    )

}
