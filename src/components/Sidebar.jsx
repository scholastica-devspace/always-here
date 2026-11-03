import { SlHome } from "react-icons/sl";
import { AiOutlineMessage } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { GrLogout } from "react-icons/gr";
import Image from '../components/Image';
import Chick from '../assets/chick.png'





const Sidebar = () => {
  return (
    <div className='w-[85%] h-[95vh] mx-auto mt-5 bg-theme rounded-2xl flex flex-col items-center justify-around'>
      <div className='w-23 h-23 rounded-full bg-transparent '>
        <Image src={Chick}/>
      </div>

      <div className="text-5xl text-white flex flex-col gap-y-12">
        <SlHome />
        <AiOutlineMessage />
        <BsBell />
        <IoSettingsOutline />
      </div>

      <GrLogout className="text-5xl text-white" />


    </div>
  )
}

export default Sidebar