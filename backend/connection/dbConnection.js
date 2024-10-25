const dotenv =require('dotenv')
const mongoose =require('mongoose')

dotenv.config()
   

const dbConnection =async()=>{
    try {
        
        const dbUrl =await mongoose.connect(process.env.MONGODB_URL)
    
        console.log(`\n mongodb connection !! DB => host: ${dbUrl.connection.host}`);

    } catch (error) {
        console.log('Data base connection failed' ,dbUrl);
        
    }

}

module.exports=dbConnection;