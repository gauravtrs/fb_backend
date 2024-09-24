const fs =require('fs');

exports.imageMiddileware =async(req ,res ,next) =>{
    try {

        if(!req.files || Object.values(req.files).length ===0){
            return res.status(400).json({ message: "No files selected." });
         }

         let fileImage =Object.values(req.files).flat();

         fileImage.forEach((file)=>{
            if(  file.mimetype !== "image/jpeg" &&
                file.mimetype !== "image/png" &&
                file.mimetype !== "image/gif" &&
                file.mimetype !== "image/webp"){
                    
                    removepath(file.tempFilePath);
                    return res.status(400).json({ message: "Unsupported format." });

                }

                if (file.size > 1024 * 1024 * 5) {
                    removepath(file.tempFilePath);
                    return res.status(400).json({ message: "File size is too large." });
                  }
         })
        
        

    } catch (error) {
        return res.status(500).json({ message: error.message });

        
    }
}

const removepath =(path)=>{
    fs.unlink(path,(err)=>{
        if(err) throw err;
    })
}