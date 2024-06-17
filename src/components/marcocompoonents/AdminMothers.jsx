
import HeadWithBack from "../microcomponents/HeadWithBack";
import { Search } from "../microcomponents/textComponents";
import AdminUserSingle from "../microcomponents/AdminUserSingle";

export default function  AdminMothers() {
 
  return (
    <>
      <div className="div">
        <HeadWithBack heading='Mothers'/>
        <div className="div">
          <div className="div p-3 h-auto">
            <Search
              type="text"
              placeholder="Search a pediatrician"
              ids="search"
              classes="rounded-[10px] p-3 w-full border-0 text-left text-[15px] outline-none"
            />
          </div>
          <div className="div w-[90%] m-auto flex flex-wrap justify-between gap-[10px] pt-5">
             <AdminUserSingle 
            //  the use type group must be retuned please to handle ui logic please isaac
             user={'mother'}
             name='Isaac Opinni' 
             time='12th/03/2045:23:50:00'
             email='opinniisaac8@gmail.com'
            //  the shows after the doctor has created it
             Description='Am a doctor the treates people well'
            //  this initlizes a message between mother and admin
             handleMassageClick={console.log('message init')}
            //  this props has natig to do with the returned data it's logic is default and shouldnot change at any time, this hides some features depending on the page it is placed 
             show={false}
             />
            
          </div>
        </div>
      </div>
    </>
  );
}
