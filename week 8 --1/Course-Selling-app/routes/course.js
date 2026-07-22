
const Router = require("express");
const courseRouter = Router();

const {userMiddleware } = require("../middleware/user");
const { purchaseModel } = require("../db");

courseRouter.post('/purchase', userMiddleware, async function (req, res) {//courses for purchase for new users

    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message:"you have the course now"
    })
});


courseRouter.get('/preview',async function (req, res) {//for new users to see all the courses available for purchase
  
    const courses = await courseModel.find({});
  
    res.json({
        courses
    })
});

module.exports = {
    courseRouter: courseRouter
}