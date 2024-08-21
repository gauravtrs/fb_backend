const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const dbConnection = require("./connection/dbConnection");

const app = express();
dotenv.config();

//set cors middleware
app.use(cors());
app.use(express.json());// for parsing json string data to json object

 
//user route
app.use("/", userRoute);

const port = process.env.PORT || 5000; 

//called data base connection
dbConnection();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 