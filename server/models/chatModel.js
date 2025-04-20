// const mongoose = require('mongoose');

// const ChatMessageSchema = new mongoose.Schema({
//   fromUserId: {
//     type: String,
//     required: true,
//   },

//   toUserId: {
//     type: String,
//     required: true,
//   },

//   message: {
//     type: String,
//     required: true,
//   },

//   timestamp: {
//     type: Date,
//     default: Date.now,
//   }
// })
class ChatMessage {
  constructor(id, fromUserId, toUserId, message) {
    this.id = id;
    this.fromUserId = fromUserId;
    this.toUserId = toUserId;
    this.message = message;
    this.timestamp = new Date().toISOString();
  }
}

module.exports = ChatMessage;