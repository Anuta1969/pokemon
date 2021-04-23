const express = require('express')
const middleware = require('./middleware/index')
const app = express()
const indexRouter = require('./routes/index')
const mongoose = require("mongoose")
const path = require('path')

mongoose.connect('mongodb://127.0.0.1:27017/pockemon', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}, () => {
  console.log('connected to db')
})

// mongoose.connect('mongodb+srv://anna:Vetrova15*@cluster0.t2wb9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// }, () => {
//   console.log('connected to db')
// })





// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://anna:<password>@cluster0.t2wb9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });




middleware(app)
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', indexRouter);

module.exports = app

