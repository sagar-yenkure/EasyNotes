
import { useState } from 'react'
// import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios"
import { register_url } from "../const/requests.js"

function Signup() {
 
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

  const handlesubmit = async (e) => {
    e.preventDefault()
    const repass = document.getElementById("re-password").value
    const pass = document.getElementById("password").value
    if(!info.email || !info.username){
      toast.error("All fields are manadatory")
    }
    if (!repass == pass) {
      toast.error("the password is not matched enter again")
    }
    await axios.post(register_url, info)
      .then((res) => {
        toast.success(res.data.msg)
      })
      .catch((err) => {
        toast.error(err.response.data.error)
      })
  }

  const onchange = (e) => {
    setinfo({ ...info, [e.target.name]: e.target.value })
  }


  return (
    <>
      <section className='bg-black w-full h-screen'>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <div className="tct text-center text-4xl font-bold  text-blue-300 p-5">Create Account,To ADD your TASKS </div>
        <div className="container flex justify-center p-5">
          <div className="md:w-[25rem] rounded-lg bg-black border border-white p-8 m-10 lg:ml-6 ">
            {/* create a new user form form */}
            <form >

              {/* UserName input  */}
              <div className="relative mb-6 text-white" data-te-input-wrapper-init>
                <input
                  onChange={onchange}
                  value={info.username}
                  name='username'
                  type="text"
                  required


                  className="peer block min-h-[auto] w-full  border-b border-gray-500 rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none"
                  id="username"
                  placeholder="Username" />
              </div>

              {/* email input */}
              <div className="relative mb-6 text-white" data-te-input-wrapper-init>
                <input
                  onChange={onchange}
                  value={info.email}
                  name='email'
                  type="text"
                  required


                  className="peer block min-h-[auto] w-full  border-b border-gray-500 rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none"
                  id="email"
                  placeholder="Email address" />

              </div>


              {/* Password input  */}
              <div className="relative mb-6 flex text-white" data-te-input-wrapper-init>
                <input
                  onChange={onchange}
                  name='password'
                  type={show}
                  value={info.password}
                  required



                  className=" relative peer block text-white min-h-[auto] w-full rounded border-b border-gray-500 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none "
                  id="password"
                  placeholder="Password" />
                <div className="showbtn end-0">
                  <button onClick={showpass}>
                    {show === "password" ? "show" : "hide"}
                  </button>
                </div>
              </div>

              {/* re-enter password input */}
              <div className="relative text-white mb-6 flex" data-te-input-wrapper-init>
                <input
                  // onChange={onchange}
                  name='re-enter password'
                  type='password'
                  id="re-password"
                  required



                  className=" relative peer block min-h-[auto] w-full rounded border-b border-gray-500 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none "
                  placeholder="Re-enter Password" />
              </div>

              <div className="mb-6 flex text-white items-center">

                already have a account ?
                <button className='text-blue-800 pl-2'><Link to="/Login">login</Link></button>

              </div>
              {/* Submit button  */}
              <button
                disabled={info.email.length=== 0}
                type="submit"
                onClick={handlesubmit}
                className="inline-block w-full rounded  px-7 pb-2.5 pt-3 text-sm font-medium uppercase text-black  leading-normal border-white shadow-[0_4px_9px_-4px_#3b71ca] bg-white">
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