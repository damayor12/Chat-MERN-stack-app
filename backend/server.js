const express = require('express')
const { chats } = require('./data/data')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const {notFound , errorHandler} = require('./middleware/errorMiddlewares')


dotenv.config()
connectDB()

const app = express()

app.use(express.json()); //middleware to accept JSON

app.get('/', (req, res)=> {
  res.send("API is Running")
})

app.use('/api/user', userRoutes);


//************** */ Error Handling **************************// Stays at the bottom
app.use(notFound)
app.use(errorHandler) 




const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('Server started on 5000'))