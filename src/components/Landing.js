import React from 'react'
import { Link } from 'react-router-dom';
import Footer from './Footer';

function Landing() {
    return (
        <>
            <div className="  conatiner h-[41rem]  w-full bg-[#D0F0C0] flex justify-center items-center">
                <div className="section m-5 ">
                    <h1 className='text-8xl font-extrabold '>The best on the internet </h1>
                    <p className='text-blue-300 text-5xl md:text-8xl font-extrabold '>for your Easy_Notes</p>
                    <div className="btn m-5 p-2 flex ">
                        <button className="mx-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 border border-blue-700 rounded">
                        <Link to="/Login">Get Started</Link>
                        </button>
                        <button className="bg-black hover:bg-white hover:text-black text-white  font-bold py-3 px-5 border border-blue-700 rounded">
                            Read More
                        </button>
                    </div>
                </div>

            </div>
            <Footer/>

        </>
    )
}
export default Landing