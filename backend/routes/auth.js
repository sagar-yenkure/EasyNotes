const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_KEY = "Sagar21Yenkure";
const fetchuser = require('../middleware/fetchuser')


//! ROUTE: 01 create a user using: POST "api/auth/CreatUser". Doesn't require Auth
router.post('/createuser', [ // cheaking the requested data 
    body('name', 'name is empty').notEmpty(),
    body('email', 'invalid mail id ').isEmail(),
    body('password', 'weak password').isLength({ min:5 })

], async (req, res) => {
    let success=false;
    //if error arrives then give  bad error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    try {
        // cheakes where email id already exists
        let user = await User.findOne({ email: req.body.email });
        
        if (user) { 
            success=false; // if user email  already exists then error
            return res.status(400).json({  success, error: "User with this Email ID alredy exits, Please Login" })
        }
        // creating a salt for password and creating a hash of passwords
        const salt = await bcrypt.genSalt(10);
        const Pass = await bcrypt.hash(req.body.password, salt);

        // if not exists then craete a user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: Pass,
        })
        const data = {   //!created the token witch contain the data of user id of mongoDB and the secret kay of administrator.  
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_KEY)
        console.log(token)
        success=true;
        res.json({  success, token })
    }
    catch (error) { // cathches error in above code
        success=false
        res.status(500).send("some problem accured in sign up")
        console.log(error)

    }
})

//! ROUTE: 02 Autthenticate a user using : post "/api/auth/login". No login requierd
router.post('/Login', [ // cheaking the requested data 
    body('email', 'invalid mail id ').isEmail(),
    body('password', 'password cannot empyty').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //chaeking user exists or not
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });//searching email in data base
        if (!user) { // if email not found  then error
            success=false;
            return res.status(400).json({ success, error: "Please try again with correct Email and Password !" })
        }              //if found then compare password
        const passwordcompare =await bcrypt.compare(password, user.password)
        if (!passwordcompare) { //if password is not same then error
                   success=false;
            return res.status(400).json({success, error: "Please try again with correct Email and Password !" })
        }                        // if the entered email and password is macthes then send token.
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_KEY)
        success=true;
        res.json({success,token})


    } catch (error) {
        res.status(500).send("some problem accured in login")
        console.log(error)
    }



})

//! ROUTE: 03 Get details of loged user's using : post "/api/auth/Getuser" . Login required
router.post('/Getuser', fetchuser,async(req,res)=>{
try {
   const userid=req.user.id
    const user = await User.findById(userid).select("-password")
    res.send(user)
} catch (error) {
    console.log(error.message)
    res.status(500).send("ome problem accured in Getuser")
    
}

})


module.exports = router // exporting auth