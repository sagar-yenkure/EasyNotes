import { useState } from "react"
import React from 'react'
import { useNavigate, Link } from "react-router-dom"
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";


function Login(props) {
    let navigate = useNavigate()
  
    // function and state to hide or show the passworld 
    const [errortxt, seterrortxt] = useState([])
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
        const responce = await fetch("http://localhost:5000/api/auth/Login", {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await responce.json()
        console.log(json)
        if (json.success) {//saving the token to local storage
            localStorage.setItem('token', json.token)
            console.log("the login token ",json.token)
            navigate('/home');
        }
        else {
            
            seterrortxt(json.error)
        }
    }

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <>
            <section>
                <div className="flex justify-center text-red-600 p-5"><h1>{errortxt}</h1></div>
                <div className="tct text-center text-4xl font-bold text-blue-300 m-2">Welcome Back , Please Login </div>
                <div className="container flex justify-center mt-[5rem] p-5">
                    <div className="md:w-[10rem] rounded-lg bg-white border border-green-300 p-8 lg:ml-6 lg:w-5/12">
                        {/* Login form */}
                        <form >

                            {/* Email input  */}
                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    onChange={onchange}
                                    name='email'
                                    type="text"
                                    value={credentials.email}

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
                                    value={credentials.password}

                                    className=" relative peer block min-h-[auto] w-full rounded border-b border-gray-500 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none "
                                    id="password"
                                    placeholder="Password" />
                                <div className="showbtn end-0">
                                    <button onClick={showpass}>
                                        {show === "password" ? <BsEyeSlashFill size={25} /> : <BsEyeFill size={25} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me checkbox  */}
                            <div className="mb-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        onChange={onchange} checked id="checked-checkbox" type="checkbox" value="true" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500">Remember me</label>

                                </div><div>

                                <p>Didn't have an account</p>
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
                                className="inline-block w-full rounded bg-green px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] bg-[#D0F0C0]">
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