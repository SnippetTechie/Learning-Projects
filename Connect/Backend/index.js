const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server listening on: http://localhost:${PORT}`);
})

app.get('/', (req,res) => {
    res.send("Default Get Route");
});

app.post('/sum', (req,res) => {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        "ans": a+b
    })
})