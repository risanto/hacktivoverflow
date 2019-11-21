if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const port = process.env.PORT || 3000

const app = express()
mongoose
  .connect(process.env.MONGOOSE_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log(err))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/', (req, res) => {
  console.log('ini home server');
})
app.use('/', routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log('listening to port', port);
})