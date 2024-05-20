import { styles ,Input} from "../microcomponents/textComponents"
import HeaderLogo from "../microcomponents/HeaderLogo"
import RoundedButton from "../microcomponents/RoundedButton"
import { buttonStyle ,Alt,File} from "../microcomponents/textComponents"
export default function Doctor(){
    return(
        <>
         <div className={`${styles}`}>
            <HeaderLogo text='Welcome to Neonates, sign-up' head='Pedetricains'/>
            <form action="">
            <Input type='text' for='firstname' label='First Name' name='firstName' placeholder='Enter first name' ids='firstname' classes='bg-white' />
            <Input type='text'  for='secondname' label='Second Name' name='secondName' placeholder='Enter second name' ids='secondname' classes='bg-white' />
            <Input type='text'  for='email' label='Email address' name='email' placeholder='Enter email address' ids='email' classes='bg-white' />
            <File type='file'  for='lisence' label='Medical lisence' name='lisence' ids='lisence' classes='bg-white' />
            <File type='file' for='cert' label='Academic qualificatons' name='cert' ids='cert' classes='bg-white' />
           <div className={`${buttonStyle}`}>
            <RoundedButton text='Sign-up' type='submit'/>
             <Alt highlightText='Sign-in' endText='instead'  link= '/User/sign-in'/>
           </div>
            </form>
         </div>
        </>
    )
}