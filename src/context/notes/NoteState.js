import React from 'react'
import NoteContext from './NoteContext'
import { useState } from 'react'


const NoteState = (props) => {
        const Host = process.env.Host
        const TOKEN = localStorage.getItem('token')
        const notesin = []
        const [notes, setnotes] = useState(notesin)
        const [isempty] = useState(true)

        //!Get all notes
        const getnotes = async () => {
                try {
                        const respone = await fetch(`${Host}/api/notes/Getnotes`, {
                                method: "GET",
                                headers: {
                                        'content-type': 'application/json',
                                        'head-token': TOKEN
                                },
                        });
                        const json = await respone.json()
                        setnotes(json)
                } catch (error) {
                        console.log("server issue in featching notes ")

                }
        }
        //!add a note
        const addNote = async (title, description, tag, date) => {
                try {
                        //API call to add note
                        const respone = await fetch(`${Host}/api/notes/Addnotes`, {
                                method: "post",
                                headers: {
                                        'content-type': 'application/json',
                                        'head-token': TOKEN
                                },
                                body: JSON.stringify({ title, description, tag, date })
                        });
                        const json = await respone.json()
                        // console.log(json)
                        const note = {
                                "_id": "",
                                "title": title,
                                "description": description,
                                "tag": tag,
                                "date": date
                        }
                        setnotes(notes.concat(note))

                } catch (error) {
                        console.log("server issue with adding note in database")

                }
                // }
        }
        //!delet a note
        const deletnote = async (id) => {
                try {
                        //deleting note at the client side
                        const Newnote = notes.filter((notes) => { return notes._id !== id })
                        setnotes(Newnote)

                        // API call to delete note

                        const respone = await fetch(`${Host}/api/notes/Deletenote/${id}`, {
                                method: "DELETE",
                                headers: {
                                        'content-type': 'application/json',
                                        'head-token': TOKEN
                                },
                        });
                        const json = await respone.json()
                        // console.log(json)
                } catch (error) {
                        console.log("server issue in deleting note")

                }
        }
        //!edit a note
        const editnote = async (id, title, description, tag) => {
                try {
                        // API call to edit note
                        const respone = await fetch(`${Host}/api/notes/Upadtenote/${id}`, {
                                method: "put",
                                headers: {
                                        'content-type': 'application/json',
                                        'head-token': TOKEN
                                },
                                body: JSON.stringify({ title, description, tag })
                        });
                        const json = await respone.json()
                        // console.log(json)

                        //editing at client sever
                        let updatednote = JSON.parse(JSON.stringify(notes)) // created a deep copy of notes
                        for (let i = 0; i < updatednote.length; i++) { //serched the elements in note copy by id theen sets the 
                                // the updated the values then added to original notes
                                const element = updatednote[i];
                                if (element._id === id) {
                                        updatednote[i].title = title
                                        updatednote[i].description = description
                                        updatednote[i].tag = tag
                                        break;
                                }
                        }
                        setnotes(updatednote)

                } catch (error) {
                        console.log("server issue in updating the note")
                }
        }

        return (

                <NoteContext.Provider value={{ notes, setnotes, addNote, deletnote, editnote, getnotes, isempty }}>
                        {props.children}
                </NoteContext.Provider>
        )
}
export default NoteState;