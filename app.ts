if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const { engine } = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const routes = require('./routes')

const app = express()
const PORT:number = Number(process.env.PORT) || 3000
const SESSION_SECRET: string | undefined = process.env.SESSION_SECRET
require('./config/mongoose')

app.engine('hbs', engine({
  defaultLayouts: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
app.use((req: any, res: any, next: any) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.warning_messages = req.flash('warning_messages')
  res.locals.error_messages = req.flash('error_messages')
  return next()
})
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express server is listening at 127.0.0.1:${PORT}`)
})
