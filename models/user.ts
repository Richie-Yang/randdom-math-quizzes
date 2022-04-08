const { Schema } = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String, required: true
  },
  score: {
    type: Number
  },
  updatedAt: {
    type: Date, required: true, default: Date.now
  },
  createdAt: {
    type: Date, required: true, default: Date.now
  },
})

module.exports = require('mongoose').model('User', userSchema)