
const mongoose = require("mongoose");
const React =require('../models/React');
const user = require("../models/user");



exports.reactPost = async (req, res) => {
    try {
        const { postId, react } = req.body;

        const check = await React.findOne({
            postRef: postId,
            reactBy: new mongoose.Types.ObjectId(req.user.userid.id),
        });

        if (check == null) { 
            const newReact = new React({
                react,
                postRef: postId,
                reactBy: req.user.userid.id,
            });
            await newReact.save();
        } else {
            if (check.react == react) {
                
                await React.findByIdAndDelete(check._id);
            } else {
                await React.findByIdAndUpdate(check._id, { react });
            }
        }

        res.status(200).json({ message: "React updated successfully" });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.getReact =async(req ,res) =>{

        try {

            const reactsArray  = await React.find({postRef:req.params.id});
            const check = await React.findOne({postRef:req.params.id, reactBy:req.user.userid.id});
            
            const newReacts = reactsArray.reduce((group, react) => {
              
                let key = react["react"];
                group[key] = group[key] || [];
                group[key].push(react);
                return group;
              }, {});
          

              const reacts = [
                {
                  react: "like",
                  count: newReacts.like ? newReacts.like.length : 0,
                },
                {
                  react: "love",
                  count: newReacts.love ? newReacts.love.length : 0,
                },
                {
                  react: "haha",
                  count: newReacts.haha ? newReacts.haha.length : 0,
                },
                {
                  react: "sad",
                  count: newReacts.sad ? newReacts.sad.length : 0,
                },
                {
                  react: "wow",
                  count: newReacts.wow ? newReacts.wow.length : 0,
                },
                {
                  react: "angry",
                  count: newReacts.angry ? newReacts.angry.length : 0,
                },
              ];
                
              const foundUser = await user.findById(req.user.userid.id);
              const checkSaved =foundUser.savePost.find((x)=> x.post?.toString() === req.params.id);
            
            
        res.json({reacts ,
             check:check?.react,
             total: reactsArray.length,
             checkSaved:checkSaved ? true :false,

            });
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }

}