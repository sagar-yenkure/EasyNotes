const jwt = require('jsonwebtoken');
const JWT_KEY = "Sagar21Yenkure"; 
const fetchuser=(req,res,next)=>{
//getting the user from jwt token and add it to req object
const token= req.header('head-token')
if(!token){
    res.status(401).send({error:"please enter the token"})
}
try {
    const data = jwt.verify(token,JWT_KEY) //converting jwt toekn into data which is the user id.
    req.user=data.user;      //the  id is saved in req.user
    next();
} catch (error) {
    res.status(500).send({error:"Unauthorized token please valide token"})
}
}


module.exports= fetchuser;