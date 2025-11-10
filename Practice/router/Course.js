const {Router} = require("express");

const CourseRouter = Router();

CourseRouter.get("/", (req,res) => {
    res.send("Heyy from Course router");
})

module.exports = {
    CourseRouter: CourseRouter
}