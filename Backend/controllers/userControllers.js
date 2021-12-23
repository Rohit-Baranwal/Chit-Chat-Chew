const expressAsyncHandler = require("express-async-handler");
const User = require('../models/userModel')
const generateToken = require('../config/generateToken');


const registerUser = expressAsyncHandler(async(req, res) =>{
    const {name, email, password, pic} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the Field");
    }

    const userExist = await User.findOne({ email });

    if(userExist)
    {
        res.status(400);
        throw new Error("User already Exist!");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
            res.status(400);
            throw new Error("Failed to create User");
    }
});


const authUser = expressAsyncHandler(async(req , res) =>{
    const {email , password} = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
            res.status(401)
            // console.log(user)
            throw new Error("Invalid Email or Password");
    }
})

const allUser = expressAsyncHandler(async(req, res) => {
    const keyword = req.query.search ? {
        $or: [
            {name: { $regex: req.query.search, $options: "i"} },
            {email: { $regex: req.query.search, $options: "i"} },
        ]
    }: {};

    const users = await User.find(keyword).find({_id: { $ne: req.user._id }});
    res.send(users);
    console.log(keyword)
})


module.exports ={ registerUser , authUser , allUser};