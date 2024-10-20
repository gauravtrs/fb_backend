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


exports.comment = async(req , res) =>{
    try {
        const { comment, image, postId } = req.body;
        let newComments = await post.findByIdAndUpdate(
          postId,
          {
            $push: {
                comments: {
                comment: comment,
                image: image,
                commentedBy:req.user.userid.id,
                commentAt: new Date(),

              },
            },
          },
          {
            new: true,
          }
        ).populate("comments.commentedBy", "picture first_name last_name username");
        console.log('new comments--- ',newComments.comments)
        res.json(newComments.comments);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };
    