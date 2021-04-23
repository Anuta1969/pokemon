module.exports = function (app){
  const session = require('express-session')
  const morgan = require('morgan')
  const path = require('path')
  const express = require('express')
  const hbs = require('hbs')
  const FileStore = require('session-file-store')(session)
  const cookieParser = require('cookie-parser')
  const { cookiesCleaner } = require("./auth")


hbs.registerPartials(__dirname + '/../views')  
app.set('view engine', 'hbs')
app.use(morgan('dev'))
app.use(cookieParser())
app.use(session({
  store: new FileStore(), 
  key: "user_sid", 
  secret: "anything_here", 
  resave: false, 
  saveUninitialized: false, 
  cookie: {
    expires: 600000, 
    httpOnly: false, 
  },
}))
app.use(cookiesCleaner)

app.set('views', path.join(__dirname,'../views'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


}
