const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const generateHash = require('../helpers/generateHash.js')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please input your name!']
  },
  email: {
    type: String,
    unique: [true, 'Email address has already been used!'],
    required: [true, 'Please input your email address!'],
    validate: [
      { // check if email format is correct
        validator: function(email) {
          var re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(email).toLowerCase());
        },
        message: props => `${props.value} is not a valid email address!`
      }
    ]
  },
  password: {
    type: String,
    required: [true, 'Please input your password!'],
    minlength: [5, 'Your password is too short! Please input a password betwen 5-15 characters.'],
    maxlength: [15, 'Your password is too long! Please input a password betwen 5-15 characters.'],
    validate: [
      {
        validator: function(password) {
          var re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
          return re.test(String(password).toLowerCase());
        },
        message: props => `Your password must contains both numbers and letters!`
      }
    ]
  },
  reputation: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

userSchema.pre('save', function(next) {
  const currentPassword = this.password
  this.password = generateHash(currentPassword)
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User