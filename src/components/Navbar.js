import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { useLocation, Link, useNavigate } from 'react-router-dom';

function Navbar() {

  const [nav, setnav] = useState(true)
  let location = useLocation();
let navigate =  useNavigate()
  const navhandle = () => {
    setnav(!nav)
  }
  const handlelogout = () => {//function to delete the token and logout to main screen
    localStorage.removeItem('token')
    navigate('/')

  }

  return (
    <div className='header w-full flex bg-[#D0F0C0] '>

      <nav className='flex justify-between md:justify-start  w-full '>
        <div className="logo mt-2 font-bold text-xl m-2 ">
          <h1>EASY_NOTE</h1>
        </div>
        <div className=' pc_menu hidden md:visible md:flex space-x-2 justify-between w-full  text-lg text-black md:ml-8'>
         {localStorage.getItem('token')? <ul className='flex  space-x-5'>
            {/* <li className={`mt-2 ${location.pathname === "/home" ? "text-cyan-900 " : ""}`}><Link to="/">Landing</Link></li> */}
            <li className={`mt-2 ${location.pathname === "/Notes" ? "text-cyan-900 " : ""}`}><Link to="/home">Notes</Link></li>
             <li className={`mt-2 ${location.pathname === "/about" ? "text-cyan-900 " : ""}`}><Link to="/about">About</Link></li>
          </ul>:""}
          {!localStorage.getItem('token')?<div className="btns space-x-2 flex float-right">
           <button className="bg-transparent  text-blue-500 font-semibold hover:text-blue-700   py-2 px-2 border hover:border-transparent rounded"><Link to="/Signup">Signup</Link></button>
            <button className="bg-transparent  text-blue-500 font-semibold hover:text-blue-700  py-2 px-2 mx-5 hover:border-transparent rounded"><Link to="/Login">login</Link></button>
          </div>: <button onClick={handlelogout} className="bg-transparent  text-blue-500 font-semibold hover:text-blue-700  py-1 px-1 border hover:border-transparent rounded">Logout</button>
          }
        </div>
        {/* close and view menu button */}
        <div onClick={navhandle} className=" ham mt-3 mr-[2rem] md:hidden">
          {!nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div>
      </nav>

      {/* mobile menu  */}

      <div className={!nav ? "mobile_menu  text-black fixed md:hidden left-0 top-[7%] w-[40%] h-full border-r border-r-gray-600 bg-[#D0F0C0] z-10     ease-in-out duration-500 linkhover" : "fixed left-[-100%]"}>
        <ul className=' mt-5 p-4 uppercase'>

          {/* <li className={`mt-2 ${location.pathname === "/home" ? "text-cyan-900 " : ""}`}><Link to="/">la</Link></li> */}
          {/* <li className={`mt-2 text-center ${location.pathname === "/home" ? "text-cyan-900 " : ""}`}><Link to="/home">Notes</Link></li> */}

          {/* <li className={`mt-2 text-center ${location.pathname === "/about" ? "text-cyan-900 " : ""}`}><Link to="/about">About</Link></li> */}

          {!localStorage.getItem('token') ? <div className="btn flex flex-col mt-2">
            <button className="bg-transparent  text-blue-500 font-semibold hover:text-blue-700  py-1 px-1 border hover:border-transparent rounded"><Link to="/Signup">Signup</Link></button>
            <button className="bg-transparent  text-blue-500 font-semibold hover:text-blue-700  py-1 px-1 hover:border-transparent rounded"><Link to="/Login">Login</Link></button></div> : <button onClick={handlelogout} className="bg-transparent  text-blue-500 font-semibold hover:text-blue-700  py-1 px-1 border hover:border-transparent rounded">Logout</button>}

        </ul>
      </div>


    </div>
  )
}
export default Navbar

