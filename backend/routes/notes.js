const express = require('express');
const router = express.Router()
const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
//! ROUTE: 01  get all the notes using get "/api/notes/Getnotes" . login reqiuerd
router.get('/Getnotes', fetchuser, async (req, res) => { //we gets the id of user by jwt token in fetch user middleware.
    const notes = await Notes.find({ user: req.user.id }) // finding the notes in db where the user id is same.
    res.json(notes) //here we geeting the notes which is matched with user id
})

//! ROUTE: 02  adding notes using get  "/api/notes/Addnotes" . login reqiuerd
router.post('/Addnotes', fetchuser, [
    body('title', 'please enter aleast 5 charcter in title').isLength({ min:4 }),//validating the notes and desc.
    body('description', 'please ente altest 5 chracter in description').isLength({ min:4 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body

        const errors = validationResult(req);//if error arrives then give  bad error
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id //here we are saving note with user is extracted by jwt
        })
        const savednote = await note.save()
        res.json(savednote)
    } catch (error) {
        res.status(500).send({ error: "some problem in add note." })
    }
})

//! ROUTE: 03  Updating notes using put "/api/notes/Updatenotes" . login reqiuerd
router.put('/Upadtenote/:id', fetchuser, async (req, res) => { //here :id is the notes id ,not of user id
    
    const { title, description, tag } = req.body;//destructring the elements
    //create a newNote object
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }
    //find the note to be upaated and update it.
    let note =await Notes.findById(req.params.id) //searching the note by note id if note is not exsist then error
    if(!note){ return res.status(400).send("note not found")}

    if(note.user.toString()!==req.user.id){   //if user id in notes is not matched with jwt id then error
        return res.status(401).send("unauhorized access denied !!")
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true}) // updating the note
    res.json({note})
})

//! ROUTE: 03  Deleting  notes using delete "/api/notes/Deletenotes" . login reqiuerd
router.delete('/Deletenote/:id',fetchuser,async(req,res)=>{
    //find the note to deleted and delete it
    let note = await Notes.findById(req.params.id)
    if(!note){ return res.status(404).send("note not found ")} 

    if(note.user.toString() !== req.user.id){   //if user id in notes is not matched with jwt id then error
        return res.status(401).send("unauhorized access denied !!")
    }
    try {
        note= await Notes.findByIdAndDelete(req.params.id)
        res.json({"sucess":"note is deleted",note:note})
        
    } catch (error) {
        return res.status(500).send("some problem in delete note.")
    }

})

module.exports = router  // exporting notes