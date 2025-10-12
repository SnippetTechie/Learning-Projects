const express = require("express");
const {UserModel , TodoModel} = require("./db");
const {auth , JWT_SECRET } = require("./auth");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://your_username_and_password_here_.8baqx3e.mongodb.net/todo-database')
  .then(() => console.log('MongoDB Connected!'));

const app = express();
app.use(express.json());

app.get('/', (req,res) => {
    res.send("This is a test Endpoint");
});

app.post('/signup', async(req,res) => {   
    const name = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    await UserModel.create({
      name: name,
      email: email,
      password: password
    })

  res.json({
    "message": "You have signed up",
  });

});


app.post('/signin', async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

      const user = await UserModel.findOne({
      email: email,
      password: password
    })

    console.log(user.id)

    if(user){
      const token = jwt.sign({
        id: user._id.toString()
      }, JWT_SECRET);

      res.send({
        token: token
      })
    }

    else{
      res.status(403).send({
        "message": "Invalid credencials",
      })
    }
});

app.post('/todo', auth , async(req,res) => {
      const userId = req.userId;
      const title = req.body.title;
      const done = req.body.done;
      const users = await TodoModel.create({
      userId,
      title,
      done
    })

    res.json({
      message: "Todo Created"
    })
});

app.get('/todos', auth ,async(req,res) => {
    const userId = req.userId;

    const todos = await TodoModel.find({
      userId
    });

    res.json({
      todos
    })
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})