const express = require('express');
const app = express();

app.use(express.json());

const user = [];

app.get('/', (req,res) => {
     res.send("This is a test End Point!");
});

function generateToken(){
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";

    for (let i = 0; i < 32; i++) {
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.post('/signup', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    user.push({
        username : username,
        password : password
    })

    res.json({
        "Message": "You have signed up"
    });

    console.log(user);
});

app.post('/signin', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    foundUser = null;
    for(let i=0; i<user.length; i++){
        if(user[i].username == username && user[i].password == password){
            foundUser = user[i];
        }
        console.log(foundUser);
    }

    if(foundUser){
        const token = generateToken();
        foundUser.token = token;   // This adds the token in the existing object!
        res.send({
            token : token
        })
        console.log(foundUser);
    }
    else{
        res.status(404).send({
            message : "Invalid Username or Password"
        })
    }
});

app.listen(3000, () => {
    console.log(`server listening at http://localhost:3000`);
});