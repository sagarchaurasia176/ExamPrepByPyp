import React from 'react'
import  logo from '../img/logoimg.png'
import { Link, NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
        <div className=' justify-between flex bg-slate-400 text-white p-4'>
       
            <div className=''>
            <Link to='/'>
            <img src={logo} className=' w-12' alt="" />
          </Link>
           
            </div>
            <div>
    
                {/* gogole auth provider  */}
               
            </div>
        </div>
  )
}

export default Navbar