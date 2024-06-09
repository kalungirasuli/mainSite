
import HeadWithBack from "../microcomponents/HeadWithBack"
import { Input } from "../microcomponents/textComponents"
import { Button3 } from "../microcomponents/RoundedButton"

export default function EditPassword(){
    return(
        <>
            <HeadWithBack heading="Edit Password"/>
            <div className="div p-10">
                <form className="div flex flex-col w-[300px] m-auto pt-[20px] md:w-[450px]">
                    <Input label="Current Password" type="password" />
                    <Input label="New Password" type="password" />
                    <Input label="Confirm Password" type="password" />
                   <div className="div w-full pt-5">
                   <Button3 text="Save" bg='bg-blue text-white'/>
                   </div>
                </form>
            </div>
        </>
    )
}