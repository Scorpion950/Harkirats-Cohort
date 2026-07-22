const { Router } = require("express");
const adminRouter = Router();

const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middleware/admin"); // Import middleware

// bcrypt - hashing passwords
// zod - validating user input
// jsonwebtoken - creating JWT tokens

const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

adminRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName } = req.body;

    await adminModel.create({
        email,
        password,
        firstName,
        lastName
    });

    res.json({
        message: "Admin signup route works!"
    });
});

adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email: email,
        password: password
    });

    if (!admin) {
        return res.json({
            message: "Admin not found!"
        });
    }

    const token = jwt.sign(
        {
            id: admin._id
        },
        JWT_ADMIN_PASSWORD
    );

    return res.json({
        token
    });
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorID: adminId
    });

    res.json({
        message: "Course Created",
        courseId: course._id
    });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    await courseModel.updateOne(
        {
            _id: courseId,
            creatorID: adminId
        },
        {
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price
        }
    );

    res.json({
        message: "Admin update route works!"
    });
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const course = await courseModel.find({
        creatorID: adminId
    });

    res.json({
        message: "Admin view route works!",
        course
    });
});

module.exports = {
    adminRouter: adminRouter
};