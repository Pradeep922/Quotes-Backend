require('dotenv').config();
const express = require('express');
const db = require('./db/connect');
const cors = require('cors')
const quote_router = require('./routes/quotes.router');
const userrouter = require('./routes/users.router')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//Connecting DB
console.log("Check", process.env.MONGO_URL)
db();

app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.get('/test', (req, res) => {
  res.send('working')
})
app.use('/', quote_router);
app.use('/users', userrouter);




const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}.`)
});