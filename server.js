const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// var knex = require("./models/database")
const cookieParser = require("cookie-parser")
const userRoutes = require("./routes/userRoutes")
const blogRoutes = require("./routes/blogRoutes")
const likeRoutes = require("./routes/likeRoutes")

app.use(cookieParser())
app.use(express.json())

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Routes
app.use(userRoutes);
app.use(blogRoutes);
app.use(likeRoutes);

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
});