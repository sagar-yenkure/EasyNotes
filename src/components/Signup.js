
import { useState } from 'react'
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

function Signup() {

  const [errortxt, seterrortxt] = useState([])
  // function and state to hide or show the passworld 
  const [show, setshow] = useState("password")
  const showpass = (e) => {
    e.preventDefault()
    if (show === "password") {
      setshow("text")
    }
    else if (show === "text") {
      setshow("password")
    }
  }

  // function and state to create and save the user details users
  const [info, setinfo] = useState({ username: "", email: "", password: "" })
  const handlesubmit = async(e) => {
    e.preventDefault()
    const repass = document.getElementById("re-password").value
    const pass = document.getElementById("password").value
    if (repass !== pass) {
      seterrortxt("the password is not matched enter again")
    }
    else{
      const responce = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ name: info.username, email: info.email, password: info.password })
      })
      const json = await responce.json()
      if(json.success){
        console.log(json)
        localStorage.setItem('token',json.token)

      }
      else{
        seterrortxt(json.error)
        console.log(json.errors)
      }
    }
  }

  const onchange = (e) => {
    setinfo({ ...info, [e.target.name]: e.target.value })
  }


  return (
    <>
      <section>
        <div className="flex justify-center text-red-600 p-5"><h1>{errortxt}</h1></div>
        <div className="tct text-center text-4xl font-bold text-blue-300 m-2">Create Account,To Lock your Notes </div>
        <div className="container flex justify-center p-5">
          <div className="md:w-[10rem] rounded-lg bg-white border border-green-300 p-8 lg:ml-6 lg:w-5/12">
            {/* create a new user form form */}
            <form >

              {/* UserName input  */}
              <div className="relative mb-6" data-te-input-wrapper-init>
                <input
                  onChange={onchange}
                  value={info.username}
                  name='username'
                  type="text"
              

                  className="peer block min-h-[auto] w-full  border-b border-gray-500 rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none"
                  id="username"
                  placeholder="Username" />
              </div>

              {/* email input */}
              <div className="relative mb-6" data-te-input-wrapper-init>
                <input
                  onChange={onchange}
                  value={info.email}
                  name='email'
                  type="text"
                

                  className="peer block min-h-[auto] w-full  border-b border-gray-500 rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none"
                  id="email"
                  placeholder="Email address" />

              </div>


              {/* Password input  */}
              <div className="relative mb-6 flex" data-te-input-wrapper-init>
                <input
                  onChange={onchange}
                  name='password'
                  type={show}
                  value={info.password}
                  required
               

                  className=" relative peer block min-h-[auto] w-full rounded border-b border-gray-500 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none "
                  id="password"
                  placeholder="Password" />
                <div className="showbtn end-0">
                  <button onClick={showpass}>
                    {show === "password" ? <BsEyeSlashFill size={25} /> : <BsEyeFill size={25} />}
                  </button>
                </div>
              </div>

              {/* re-enter password input */}
              <div className="relative mb-6 flex" data-te-input-wrapper-init>
                <input
                  // onChange={onchange}
                  name='re-enter password'
                  type='password'
                  id="re-password"
               


                  className=" relative peer block min-h-[auto] w-full rounded border-b border-gray-500 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none "
                  placeholder="Re-enter Password" />
              </div>

              {/* Remember me checkbox  */}
              <div className="mb-6 flex items-center">
               
                already have a account ?
                <button className='text-blue-800'><Link to="/Login">login</Link></button>

              </div>
              {/* Submit button  */}
              <button
                type="submit"
                onClick={handlesubmit}
                className="inline-block w-full rounded bg-green px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] bg-[#D0F0C0]">
                Signup
              </button>
            </form>
          </div>
        </div>

      </section>
    </>
  )
}

export default Signup