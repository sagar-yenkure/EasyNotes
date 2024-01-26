import React from 'react'
import { useContext, useState, useEffect } from 'react'
import Notecontext from "../context/notes/NoteContext"
import Allnote from './allnote';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




export default function Home() {
  let navigate = useNavigate()
  const context = useContext(Notecontext);
  const { notes, addNote, getnotes } = context;
  const [note, setnote] = useState({ title: "", description: "", tag: "", date: "" })
  const [date, setdate] = useState(Date.now())
  var [set, setset] = useState({ title: "", description: "", tag: "" })
  const [visi, setvisi] = useState("hidden")


  useEffect(() => {//the useEffect to show the all notes that we fetched from database
    if (localStorage.getItem('token')) {
      getnotes()
    }
    else {
      navigate('/Login')
    }
    // eslint-disable-next-line
  }, [])

  //  function to add note into db and to clint side
  const handleadd = (e) => {
    e.preventDefault()
    console.log(note.title, note.description, note.tag, date)
    addNote(note.title, note.description, note.tag, date.toString())
    setnote({ title: "", description: "", tag: "", date: "" })

  }
  const handleclear = () => {
    setnote({ title: "", description: "", tag: "" })
  }

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }
  //  function to upadte function 
  const updatenote = (Title, Desc, Tag, id,date) => {
    setset({ title: Title, description: Desc, tag: Tag, id: id ,date:date});
    setvisi("visible")
  }

  const close = () => {
    setvisi("hidden")
  }

  return (
    < >
      <main className='bg-black h-screen'>

        <Navbar />
        {<Modal visi={visi} close={close} set={set} />}
        {/* the form to add Notles in database */}
        <div className='section flex flex-col justify-center bg-black items-center space-y-4 pt-[1rem]'>
          <h1 className='text-lg text-white font-bold m-5'>Add Your Task Here:</h1>



          <div className="form relative">
            <form className="w-full px-15" >
              <div className="flex flex-col items-center border-b border-teal-500 py-2 px-16 space-y-2">
                {/* note area */}

                <input className="note_title hover:border-2  border-black appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" title='minimum 5 charactor expect' minLength={5} required type="text" value={note.title} placeholder="Note Title " id='title' name='title' aria-label="Full name" onChange={onchange} />
                {/* decsription area */}


                <input className=" note_description appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" minLength={5} required type="text" value={note.description} placeholder="Note description" id='description' name='description' aria-label="Full name" onChange={onchange} />
                {/* note tag  */}

                <input className=" note_tag appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Note Tag" id='tag' value={note.tag} name='tag' aria-label="Full name" onChange={onchange} />
    
                <DatePicker minDate={new Date()}  showIcon selected={date} dateFormat="dd/MM/yyyy" onChange={(date)=> setdate(date)} />
                {/* note add botton */}
              </div>
              <button disabled={note.title.length < 5 || note.description.length < 5} onClick={handleadd} title='add task' className=" addbtn  flex-shrink-0 bg-teal-500 hover:bg-teal-700 title border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded mt-4 ml-10 " type="button">
                ADD
              </button>
              {/* note cancle button  */}

              <button onClick={handleclear} title='clear the input' className=" deletebtn-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
                Cancel
              </button>
            </form>
          </div>
          {/* fetched all notes section  */}
          <div className="fetchednotes">
            <h1 className='text-lg font-bold m-5  text-white'>YOUR TASK:</h1>
          </div>
        </div >

        {/* Mapping throw the database */}
        {notes.length === 0 ? <div className='text-3xl font-extralight flex justify-center bg-black h-[20rem] text-white'> No Notes Available To Display
        </div> :
          <div className='grid grid-cols-1 overflow-hidden md:grid-cols-4 bg-black m-3'>
            {notes.map((el) => {
              return <Allnote updatenote={updatenote} key={el._id} Title={el.title} Desc={el.description} Tag={el.tag} id={el._id} date={el.date} />
            })}
          </div>
        }

      </main>
    </>
  )
}
