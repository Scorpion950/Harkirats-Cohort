const {Router} = require('express');
const {userModel, purchaseModel} = require('../db');

const jwt = require('jsonwebtoken');
const {JWT_USER_PASSWORD} = require("../config");

const userRouter = Router()


userRouter.post('/signup',async function (req, res) {
    const {email,password,firstName,lastName} = req.body;//adding Zod and hashing the pass 

    await userModel.create({
        email,
        password,
        firstName,
        lastName
    })
    res.json({
        message:"User signup route works!"
    })
});

userRouter.post('/signin', async function (req, res) {
    const {email,password} = req.body;

    //password should be hashed, compare the user provided and db pass.
    const user = await userModel.findOne({ //findOne either the user or null
        email:email,
        password:password
    });

    if (!user) {
        return res.json({
            message: "User not found!"
        });
    }

    const token = jwt.sign(
        {
            id: user._id
        },JWT_USER_PASSWORD);

    return res.json({
        token
    });
});

userRouter.get('/purchases',useerMiddleware,async function (req, res) {//for old users who have already purchased
 
        const userId = req.userId;


        const purchases = await purchaseModel.find({
            userId,
            courseId
        })

    res.json({
        message:"User purchases route works!"
    })
});


module.exports = {
    userRouter: userRouter
}