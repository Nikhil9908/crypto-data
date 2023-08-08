const express = require('express')
const app = express()
const mongoose = require('mongoose');
const path = require('path')
const route  = require('./routes/route');
const cors = require('cors')

app.use(express.json())
app.use(cors());

app.use(express.static(path.join(__dirname, '../client')))


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });

mongoose.connect('mongodb+srv://Nikhil99:YMdCuusWj73Jr20o@cluster0.wtmewxp.mongodb.net/quadB-task', {
 useNewUrlParser: true
}).then(()=> {
    console.log('Mongoose is connected');
})
.catch((err) => console.log('No connection'))

app.use('/', route);



app.listen(3000, ()=>{
    console.log(`server is running at PORT no. ${3000}`)
})
