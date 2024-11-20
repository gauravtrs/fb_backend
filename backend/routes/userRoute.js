const express =require('express');
const {  register, activateAccount, login ,
     sendVerification, findUser, passwordVerificationCode,
      passwordCodeVerify, changePassword, searchProfile, updateProfilePicture, 
      updateCoverPicture, updateDetails, addFriend, cancelRequest, unfollow, follow, 
      acceptRequest, unfriend, deleteRequest, search, 
      addToSearchHistory,
      getSearchHistory,
      removeFromSearch,
      getFriendsPageInfos,
      sendMessage,
      getMessages} = require('../controller/userController');
const {authUser}= require('../middlwares/userAuth');
const router =express.Router();


//user registration
router.post('/register' , register);

//user activate account
router.post('/activate' , authUser,activateAccount);

//user login
router.post('/login' , login);

//sendVerification mail again..

router.post('/sendverification' ,authUser ,sendVerification)

//find user..
router.post('/finduser' ,findUser)

//send password code..
router.post('/sendcode' , passwordVerificationCode)

//password code verify..
router.post('/codeverify' , passwordCodeVerify)

//change password ..
router.post('/changepassword' , changePassword)


//search profile..
router.get('/searchprofile/:username' ,authUser,searchProfile);

//update profile picture
router.put('/updateprofilepicture',authUser, updateProfilePicture);

//update cover picture
router.put('/updatecoverpicture',authUser , updateCoverPicture)

//update details
router.put('/updatedetails' ,authUser ,updateDetails)

//add friend
router.put('/addfriends/:id' ,authUser ,addFriend)

//cancel friend requests
router.put('/cancelrequest/:id' , authUser ,cancelRequest)

//unfollows
router.put('/unfollow/:id' , authUser ,unfollow)

//follow
router.put('/follow/:id' , authUser , follow)

//accept request
router.put('/acceptrequest/:id' , authUser ,acceptRequest)

//unfriend
router.put('/unfriend/:id' ,authUser ,unfriend)

//delete friend request
router.put('/deleterequest/:id' , authUser ,deleteRequest)

//search..
router.post("/search/:searchTerm", authUser, search);

//add to search history
router.put("/addToSearchHistory", authUser, addToSearchHistory);

//get search history
router.get('/getsearchhistory' , authUser , getSearchHistory);

//remove search history
router.put('/removesearchhistory' , authUser , removeFromSearch);

//get friends request page infomation..
router.get('/getFriendsPageInfos' , authUser , getFriendsPageInfos);  

//send message route ...
router.post('/sendmessage' , authUser , sendMessage);

//get message route ...
router.get('/getmessage/:receiverId' , authUser , getMessages)








module.exports=router;