const {post} =require('../models/post');
const user =require('../models/user');

exports.createPost =async(req , res)=>{

    try {
        const newPost =await new post(req.body).save();
        await newPost.populate("user" ,"first_name last_name picture username cover")
        
        res.json(newPost)
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
}

exports.getAllPost = async(req , res) =>{

     try {
       const followingTemp = await user.findById(req.user.userid.id).select("following");
       const following = followingTemp.following;
       const promises= following.map((followingId) =>{
        return post.find({user:followingId}).populate("user" ,"first_name last_name picture username cover").
        populate("comments.commentedBy", "picture first_name last_name username").sort({createdAt: -1}).limit(10);
       });

       const followingPost = await(await Promise.all(promises)).flat();
        const userPosts = await post.find({user:req.user.userid.id}).populate("user" ,"first_name last_name picture username cover").
        populate("comments.commentedBy", "picture first_name last_name username").sort({createdAt: -1}).limit(10);
       followingPost.push(...[...userPosts])

       followingPost.sort((a,b)=>{
        return b.createdAt - a.createdAt;
       });
       res.json(followingPost)


       

  

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
                commentedAt: new Date(),

              },
            },
          },
          {
            new: true,
          }
        ).populate("comments.commentedBy", "picture first_name last_name username");
        
        res.json(newComments.comments);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };
    

 exports.savePost = async (req, res) => { 
      try {
        const postId = req.params.id;
        const foundUser = await user.findById(req.user.userid.id);
    
        if (!foundUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const check = foundUser?.savePost.find((postSave) => {
          
          return postSave.post?.toString() == postId; 
        });
    
        if (check) {
          await user.findByIdAndUpdate(req.user.userid.id, {
            $pull: {
              savePost: {
                _id: check._id,
              },
            },
          });
          return res.status(200).json({ message: 'Post removed from saved' });
        } else {
          await user.findByIdAndUpdate(req.user.userid.id, {
            $push: {
              savePost: {
                post: postId,
                saveAt: new Date(),
              },
            },
          });
          return res.status(200).json({ message: 'Post saved successfully' });
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };
    

 exports.deletePost = async(req , res) =>{
  try {

    await post.findByIdAndDelete(req.params.id);
    res.json({status:'ok'});
    
  } catch (error) {
    return res.status(500).json({ message: error.message });

  }
 }   