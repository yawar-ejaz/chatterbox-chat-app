const asyncHandler = require(`express-async-handler`);
const Users = require(`../models/users`);
const { encrypt, isMatching } = require("../utils/hashing");
const generateToken = require(`../utils/generateToken`);

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    if (!name) {
        res.status(400);
        throw new Error(`Name not availible`);
    }
    if (!email) {
        res.status(400);
        throw new Error(`Email not availible`);
    }
    if (!password) {
        res.status(400);
        throw new Error(`Password not availible`);
    }

    const existingUser = await Users.findOne({
        where: {
            email: email
        }
    });
    if (existingUser) {
        res.status(400);
        throw new Error(`User with this email id already exists`);
    }

    const user = await Users.create({
        name,
        email,
        password: await encrypt(password),
        picture: pic
    });
    if (user) {
        res.status(201).json({
            success: true,
            token: generateToken(user._id),
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            message: "Account created successfully"
        });
    }
    else {
        res.status(400);
        throw new Error(`Unable to create user`);
    }
});

const authUser = asyncHandler(async (req, res) => { 
    const { email, password } = req.body;
    if (!email) {
        res.status(400);
        throw new Error(`Email not availible`);
    }
    if (!password) {
        res.status(400);
        throw new Error(`Password not availible`);
    }

    const existingUser = await Users.findOne({
        where: {
            email: email
        }
    });

    if (!existingUser) {
        res.status(400);
        throw new Error(`User not exists!`);
    }
    
    if (await isMatching(password, existingUser.password)) {
        return res.status(200).json({
            success: true,
            token: generateToken(existingUser._id),
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            pic: existingUser.pic,
            message: "Login Successful"
        });
    }
    else {
        res.status(400);
        throw new Error(`Incorrect password`);
    }
});

const allUsers = asyncHandler(async (req, res) => {
    const name = req.query.search;
    
});

module.exports = { registerUser, authUser, allUsers };