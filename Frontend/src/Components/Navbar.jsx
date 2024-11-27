import React from 'react'
import  logo from '../img/logoimg.png'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
        <div className=' justify-between flex bg-slate-100 text-white p-2'>
            <div className=''>
               <img src={logo} className=' w-12' alt="" />
            </div>
            <div>
    
                {/* gogole auth provider  */}
               
            </div>
        </div>
  )
}

export default Navbar