import { styles ,Input} from "../microcomponents/textComponents"
import HeaderLogo from "../microcomponents/HeaderLogo"
import RoundedButton from "../microcomponents/RoundedButton"
import { buttonStyle ,Alt} from "../microcomponents/textComponents"
export default function SignUp(){
    return(
        <>
         <div className={`${styles}`}>
            <HeaderLogo text='Welcome to Neonates, sign-In' head='Neonates'/>
            <form action="">
            <Input type='text' ids='email' for='email' label='Email address' name='email' placeholder='Enter email address'  classes='bg-white' />
            <Input type='password' ids='Password' for='password' label='Password' name='password' placeholder='Enter password'  classes='bg-white' />
           <div className={`${buttonStyle}`}>
            <RoundedButton text='Sign-in'  />
            <Alt endText='Forgot password' />
             <Alt highlightText='Sign-up' endText='instead'link= '/User/sign-in' />
            
           </div>
            </form>
         </div>
        </>
    )
}