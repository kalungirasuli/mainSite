import { styles ,Input} from "../microcomponents/textComponents"
import HeaderLogo from "../microcomponents/HeaderLogo"
import RoundedButton from "../microcomponents/RoundedButton"
import { buttonStyle ,Alt} from "../microcomponents/textComponents"
export default function Mother(){
    return(
        <>
         <div className={`${styles}`}>
            <HeaderLogo text='Welcome to Neonates, sign-up' head='Mothers'/>
            <form action="">
            <Input type='text' id='firstname' for='firstname' label='First Name' name='firstName' placeholder='Enter first name' ids='firstname' classes='bg-white' />
            <Input type='text' id='secondname' for='secondname' label='Second Name' name='secondName' placeholder='Enter second name' ids='secondname' classes='bg-white' />
            <Input type='text' id='email' for='email' label='Email address' name='email' placeholder='Enter email address' ids='email' classes='bg-white' />
           <div className={`${buttonStyle}`}>
            <RoundedButton text='Sign-up' type='sumbit'/>
             <Alt highlightText='Sign-in' endText='instead' />
           </div>
            </form>
         </div>
        </>
    )
}