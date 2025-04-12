import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnect from './config/dbConnection.js'
import router from './router/router.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', router)

dbConnect().then(() => app.listen(process.env.PORT || 8000, () =>
  console.log(`Server running on port ${process.env.PORT || 8000}`)
))

