const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const dbConnection = require("./connection/dbConnection");
const routerUpload = require("./routes/uploadRoutes");
const routerPost = require("./routes/postRoutes");
const fileUpload = require('express-fileupload');
const routerReact = require("./routes/reactRoutes");
const path = require("path");
const cookieParser = require('cookie-parser');
 



const app = express();
dotenv.config();


//set cookie-parser middleware
app.use(cookieParser());
//set cors middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());// for parsing json string data to json object

//file upload package
app.use(fileUpload({
  useTempFiles:true,
}));

 
//user route
app.use("/", userRoute);
//upload image route
app.use('/', routerUpload);
//post router
app.use('/',routerPost);
//React router
app.use('/' ,routerReact);



const port = process.env.PORT || 5000; 





//for production route
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  //any route that is not will be redirected to index.html

  app.get('*' ,(req ,res) =>
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html")));

}else{
  app.get('/' ,(req,res) =>{
      res.send('API is running...');
  });
}    

//called data base connection  
dbConnection();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
  