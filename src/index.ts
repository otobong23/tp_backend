import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors';
import cookieParser from 'cookie-parser'
import http from 'http';
import mongoose from 'mongoose';
import router from './routers';

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000
const MONGO_URI: string = process.env.MONGO_URI || ''

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000/', 'https://tradephere.onrender.com/', '*']
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', router)



const server = http.createServer(app)
mongoose.Promise = Promise
mongoose.connect(MONGO_URI, {
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000,
}).then(() => {
  console.log('Database is connected')
  server.listen(PORT, () => {
    console.log(`server listening from http://localhost:${PORT}/`)
  })
}).catch(e => console.warn('connection error'))


