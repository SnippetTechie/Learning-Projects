const {Router} = require("express");

const UserRouter = Router();

UserRouter.get("/1", (req,res) => {
    res.send("Heyy from User1 router");
})

UserRouter.get("/2", (req,res) => {
    res.send("Heyy from User router");
})

UserRouter.get("/3", (req,res) => {
    res.send("Heyy from User router");
})

module.exports = {
    UserRouter: UserRouter
}