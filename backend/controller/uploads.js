const fs =require('fs');
const cloudinary =require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})


exports.uploadImages = async(req , res) =>{
    try {
        const image=[]
        const {path} =req.body;
        const file =Object.values(req.files).flat();

        for(let newfiles of file){
         let url= await  uploadToCloudinary(newfiles ,path)
         image.push(url)
            removepath(newfiles.tempFilePath);

        }
        res.json(image);
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
}

exports.listImages = async(req ,res) =>{
    try {
        const {path ,sort ,max} =req.body;

        cloudinary.v2.search.expression(`${path}`).sort_by('created_at',`${sort}`)
        .max_results(max).execute().then((result)=>{
            res.json(result)
        }).catch((err)=>{
            console.log(err.error.message)
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });

        
    }
}


//upload on cloudinary 
const uploadToCloudinary =async(file , path) =>{
    try {

        const res = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: path,
          });

          if(res.secure_url){
            return{
                url:res.secure_url,
            }
          } else {
            throw new Error("Failed to retrieve secure URL.");
          }
        
    } catch (error) {
        removepath(file.tempFilePath);
        return res.status(400).json({ message: "Upload image failed." });

        
    }
}








//remove path
const removepath =(path)=>{
    fs.unlink(path,(err)=>{
        if(err) throw err;
    })
}