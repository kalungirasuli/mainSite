
import HeaderLogo from "../microcomponents/HeaderLogo";
import { Input,styles } from "../microcomponents/textComponents";
import { Button3 } from "../microcomponents/RoundedButton";

export default function ResetPassword() {
   
    return (
        <>
            
            <div className={`${styles}`}>
            <HeaderLogo head="Forgot Password" />
                <form  className="flex flex-col w-[300px] m-auto pt-[20px] md:w-[450px]">
                    <Input 
                        label="Enter recovery email address " 
                        type="email" 
                        
                    />
                    
                    <div className="w-full pt-5">
                        <Button3 text="Get reset code" bg='bg-blue text-white' />
                    </div>
                </form>
            </div>
        </>
    );
}
