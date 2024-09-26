const {post} =require('../models/post');

exports.createPost =async(req , res)=>{

    try {
        const newPost =await new post(req.body).save();
        res.json(newPost)
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
}