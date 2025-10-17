const express = require("express");
const bcrypt = require('bcrypt');
const {UserModel , TodoModel} = require("./db");
const {auth , JWT_SECRET } = require("./auth");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://webaccessin3_db_user:nXr4GTghoAjMfrwn@cluster0.8baqx3e.mongodb.net/todo-database')
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

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword
    })

  res.json({
    "message": "You have signed up",
  });

});


app.post('/signin', async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
      email: email
    })

    if(!user){
      res.send({
        "message": "user does not exist!" 
      })
      return
    }
    
    const matchedPassword = await bcrypt.compare(password, user.password)

    if(matchedPassword){
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