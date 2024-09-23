require('dotenv').config();
const express = require('express')
const sequelize = require('./db');
const models = require('./models/models')

const PORT = process.env.PORT

const app = express()

const start = async () => {
  try{
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`start server at port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()