import HeadWithBack from "../microcomponents/HeadWithBack"
import { Date,Time ,File, TextArea} from "../microcomponents/textComponents"
import { Button3 } from "../microcomponents/RoundedButton"

export default function Booking(){
    const days=[
        {
            day:'Sun',
            hours:['20:30-22:30','23:30-00:00']
        },
        {
            day:'Mon',
            hours:['20:30-22:30','23:30-00:00']
        },
        {
            day:'Tue',
            hours:['20:30-22:30','23:30-00:00,']
        },
        {
            day:'Wed',
            hours:['23:30-00:00']
        },
        {
            day:'Thur',
            hours:['20:30-22:30','23:30-00:00']
        },
        {
            day:'Fri',
            hours:['20:30-22:30','23:30-00:00','24:01-00:30','01:30-02:00']
        },
        {
            day:'Sat',
            hours:['20:30-22:30','23:30-00:00']
        },
    ]
    const mode=['Physical','Online']
    return(
        <>
        <HeadWithBack heading="Booking ppointment"/>
        <div className="div w-[90%] m-auto pt-10 ">
        <div className="div relative -z-50 w-[70px] h-[70px] rounded-[50%] m-auto md:w-[150px] md:h-[150px]">
                <img src="https://picsum.photos/200/300" className="w-full h-full rounded-[50%] border-" alt="loading" loading='lazy' />
                <span className="w-[max-content] h-[max-content] absolute top-[0px] right-[10px] ">
                </span>
          </div>
            <form action="" className="w-full">
                   <div className="div w-[90%] m-auto">
                   <Date days={days} label='Selete a day'/>
                   </div>
                   <div className="div flex flex-col md:flex-row justify-between gap-[30px] w-[90%] m-auto">
                   <Time time={days[5].hours} label='Selete time'/>
                    <Time time={mode} label='Selete a mode'/>
                   </div>
                   <div className="duv w-[90%] m-auto" >
                   <File label='Attach medical files (if there is any)' type='file'/>
                   </div>
                    <TextArea placeholder='Describe your issue to the doctor in less than 300 words' />
                    <div className="div w-[90%] p-5 m-auto mt-10">
                    <Button3 text='Continue' bg='bg-blue' color='text-white' rounded='rounded-[10px]' width='w-[90%] m-auto'/>
                    </div>
            </form>
        </div>
        </>
    )
}