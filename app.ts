if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const { engine } = require('express-handlebars')
const routes = require('./routes')

const app = express()
const PORT:number = Number(process.env.PORT) || 3000
require('./config/mongoose')

app.engine('hbs', engine({
  defaultLayouts: 'main',
  extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(routes)

app.listen(PORT, () => {
  console.log(`Express server is listening at 127.0.0.1:${PORT}`)
})
