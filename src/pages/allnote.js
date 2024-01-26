import React from 'react'
import { AiFillDelete , AiFillEdit} from "react-icons/ai";
import { useContext  } from 'react'
import NoteContext from "../context/notes/NoteContext"

export default function Allnote(props) {
  const { Title, Desc, Tag ,id , date, updatenote} = props
  const context = useContext(NoteContext);
  const {deletnote}= context

 
  return (
    <div className=' flex justify-between rounded-lg bg-[#D0F0C0] m-2' >
      <div className="  p-3  flex flex-col flex-wrap" >
        <h1 className='font-bold'>Title : {Title}</h1> 
        <p className='font-bold'>Description : {Desc} </p>
        <p className='font-bold'>Tag: {Tag} </p>
        <p className='font-bold'>Date: {date} </p>
        {/* <p className='font-bold'>id: {id} </p> */}
      </div>
      <div className="btn flex flex-col space-y-5 m-2">

      <button title='delete task' onClick={()=>{deletnote(id)}} className='w-5 btn' >
        <AiFillDelete />
      </button>
      <button title='edit task' onClick={()=>{updatenote(Title, Desc, Tag,id)}}   className='w-5 btn'>
        <AiFillEdit/>
      </button>
      </div>

    </div>
  )
}
