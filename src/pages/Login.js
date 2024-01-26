import { useState } from "react"
import React from 'react'
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { login_url } from "../const/requests"
import toast, { Toaster } from 'react-hot-toast';

function Login(props) {
    const navigate=useNavigate()

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
    // function and state to store email and password of user
    const [credentials, setcredentials] = useState({ email: "", password: "" })

    const handlesubmit = async (e) => {
        e.preventDefault()
        await axios.post(login_url,credentials)
        .then((res) => {
            console.log(res)
            localStorage.setItem("token",res.data.token)
          navigate('/Home')
        })
        .catch((err) => {
            console.log(err)
            toast.error(err.response.data.error)
        })

    }

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <>
            <section className="bg-black h-screen">
            <Toaster
          position="top-center"
          reverseOrder={false}
        />
                <div className="tct text-center text-4xl font-bold text-blue-300 p-5 ">Welcome Back , Please Login </div>
                <div className="container  flex justify-center mt-[5rem] p-5">
                    <div className=" neo md:w-[25rem] rounded-lg bg-black border border-white p-8">
                        {/* Login form */}
                        <form className="" >

                            {/* Email input  */}
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    onChange={onchange}
                                    name='email'
                                    type="text"
                                    value={credentials.email}

                                    className="peer block min-h-[auto] w-full text-white border-b border-gray-500 rounded bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none"
                                    id="email"
                                    placeholder="Email address" />

                            </div>

                            {/* Password input  */}
                            <div className="relative mb-6 flex" data-te-input-wrapper-init>
                                <input
                                    onChange={onchange}
                                    name='password'
                                    type={show}
                                    value={credentials.password}

                                    className=" relative peer block min-h-[auto] w-full rounded border-b text-white border-gray-500 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none "
                                    id="password"
                                    placeholder="Password" />
                                <div className="showbtn end-0">
                                    <button onClick={showpass} className="text-white">
                                        {show === "password" ? "show" : "hide"}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me checkbox  */}
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        onChange={onchange} checked id="checked-checkbox" type="checkbox" value="true" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500">Remember me</label>

                                </div>
                                <div>

                                    <p className="text-white">Didn't have an account</p>
                                    <button
                                        className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 text-blue-700"
                                    >
                                        <Link to="/Signup"> Create Account</Link>
                                    </button>
                                </div>

                            </div>

                            {/* Submit button  */}
                            <button onClick={handlesubmit}
                                type="submit"
                                disabled={credentials.email.length === 0}
                                className="inline-block w-full rounded bg-green px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] bg-white">
                                Login
                            </button>
                        </form>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Login