import React, { useEffect, useRef, useState, useContext } from 'react'
import Notecontext from "../context/notes/NoteContext"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Modal(props) {
    const context = useContext(Notecontext);
    const { editnote } = context;
    const ref = useRef(null)
    const [date, setdate] = useState(Date.now())
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const { visi, close, set  } = props; //getting the value of title,dec and tag form func


    useEffect(() => { //setting the values of set to note
        setnote({ id: set.id, etitle: set.title, edescription: set.description, etag: set.tag })
        // eslint-disable-next-line
    }, [set])

    // function on clicking the update button
    const handleadit = (e) => {
        e.preventDefault()
        editnote(note.id, note.etitle, note.edescription, note.etag)
        ref.current.click()
    }

    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className={` section border-2 absolute top-[10rem] z-10 left-[5rem] md:left-[25rem] ${visi} border-gray-200 p-1 rounded-xl bg-[#D0F0C0] `} >
                <h1 className='text-lg font-bold m-2'>Edit the note</h1>

                {/* the editing adding form */}

                <div className="form">
                    <form className="w-full p-3" >
                        <div className="flex flex-col items-center border-b border-teal-500 space-y-2">
                            {/* note area */}

                            <input className=" note_description appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 focus:outline-none" minLength={5} required type="text" placeholder="" value={note.etitle} id='etitle' name='etitle' aria-label="Full name" onChange={onchange} />
                            {/* decsription area */}


                            <input className=" note_description appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 focus:outline-none" minLength={5} required type="text" placeholder="" id='edescription' value={note.edescription} name='edescription' aria-label="Full name" onChange={onchange} />
                            {/* note tag */}

                            <input className=" note_tag appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="" id='etag' name='etag' value={note.etag} aria-label="Full name" onChange={onchange} />

                            {/* update button */}
                        </div>
                        <button disabled={note.etitle.length <5|| note.edescription.length<5} onClick={handleadit} className=" updatebtn flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded mt-4 ml-10">
                            Update
                        </button>

                        {/* note cancle button */}

                        <button ref={ref} onClick={close} className=" deletebtn-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
                            Cancel
                        </button>
                    </form>
                </div>
            </div>


        </>
    )
}