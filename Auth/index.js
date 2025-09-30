const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
app.use(express.json());

const user = [];

app.get("/", (req, res) => {
  res.send("This is a test End Point!");
});

// function generateToken() {
//   let options = [
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "g",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "m",
//     "n",
//     "o",
//     "p",
//     "q",
//     "r",
//     "s",
//     "t",
//     "u",
//     "v",
//     "w",
//     "x",
//     "y",
//     "z",
//     "A",
//     "B",
//     "C",
//     "D",
//     "E",
//     "F",
//     "G",
//     "H",
//     "I",
//     "J",
//     "K",
//     "L",
//     "M",
//     "N",
//     "O",
//     "P",
//     "Q",
//     "R",
//     "S",
//     "T",
//     "U",
//     "V",
//     "W",
//     "X",
//     "Y",
//     "Z",
//     "0",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//   ];

//   let token = "";

//   for (let i = 0; i < 32; i++) {
//     token += options[Math.floor(Math.random() * options.length)];
//   }
//   return token;
// }

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  user.push({
    username: username,
    password: password,
  });

  res.json({
    Message: "You have signed up",
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  foundUser = null;
  for (let i = 0; i < user.length; i++) {
    if (user[i].username == username && user[i].password == password) {
      foundUser = user[i];
    }
  }

  // Adding stateless token 

  if (foundUser) {
    const token = jwt.sign({
        username: username
    }, JWT_SECRET);  //converts the username into a jwt
    
    // foundUser.token = token; 

    res.send({
      token: token,
    });
  } else {
    res.status(404).send({
      message: "Invalid Username or Password",
    });
  }
});

app.get("/me", (req, res) => {
  const token = req.headers.token;
  const decodeInformation = jwt.verify(token, JWT_SECRET);
  const username = decodeInformation.username
  let foundUser = null;

  for (let i = 0; i < user.length; i++) {
    if (user[i].username == username) {
      foundUser = user[i];
    }
  }

  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password
    });

  } else {
    res.json({
      message: "token invalid",
    });
  }
});

app.listen(3000, () => {
  console.log(`server listening at http://localhost:3000`);
});
