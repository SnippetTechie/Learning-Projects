const express = require('express')
const {UserRouter} = require("./router/User")
const {CourseRouter} = require("./router/Course")
const app = express()

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/course", CourseRouter);

app.listen(3000);