import HeadWithBack from "../microcomponents/HeadWithBack"
import { Date } from "../microcomponents/textComponents"

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
    return(
        <>
        <HeadWithBack heading="Booking ppointment"/>
        <div className="div">
            <form action="">
                    <Date days={days}/>
            </form>
        </div>
        </>
    )
}