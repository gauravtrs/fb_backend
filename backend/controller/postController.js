const {post} =require('../models/post');

exports.createPost =async(req , res)=>{

    try {
        const newPost =await new post(req.body).save();
        res.json(newPost)
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
}

exports.getAllPost = async(req , res) =>{
    try {
        const allPosts = await post.find().populate("user" , "first_name last_name picture username gender").sort({createdAt: -1});
        if(!allPosts){
            res.status(400).json({message:"No posts found."})
        }
        res.status(200).json(allPosts);
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}