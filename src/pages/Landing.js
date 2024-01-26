import React from 'react'
import story from "../Assets/story.svg"
import { Link } from 'react-router-dom';
import Footer from './Footer';

function Landing() {
    return (
        <>
            <main className="main w-full h-screen flex md:flex-row flex-col md:justify-between bg-black">

                <section className="section w-full md:w-[60%] flex justify-center items-center ">
                    <div className="bg-black text-white font-bold flex flex-col justify-center p-10 text-2xl">
                        Tasky - TASK MANAGER
                        <img className=' w-[20rem] p-3 md:w-[30rem]' src={story} alt="" /></div>
                </section>
                {/* the auth botton */}
                <section className="section  w-full flex justify-center items-center pt-10 bg-gray-800 md:pt-0 md:w-[50%] ">
                    <div className="buttons neo flex flex-col md:flex-row md:space-x-6 text-white font-bold border rounded-lg p-[4rem] w-fit h-fit">
                        <button className='p-2 neo border rounded-lg px-16 py-4 m-3 hover:text-black hover:bg-white' ><Link to="/Signup">signup</Link></button>
                        <button className='p-2 neo border rounded-lg px-16 py-4 m-3 hover:text-black hover:bg-white' ><Link to="/login">login</Link></button>


                    </div>


                </section>
            </main>
            <Footer />

        </>
    )
}
export default Landing