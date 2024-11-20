const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: 'user', 
      required: true,
    },
    receiver: {
      type: ObjectId,
      ref: 'user', 
      required: true,
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
    },
    messageAt:{
      type:Date,
      required:true,
  },
    
    isRead: {
      type: Boolean,
      default: false, 
    },

  },
  { timestamps: true } 
);

const chat = mongoose.model('chat', chatSchema);

module.exports = chat;
