// const mongoose = require('mongoose')

// const ItemSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//   },

//   description: {
//     type: String,
//     required: true,
//   },

//   category: {
//     type: String,
//     required: true,
//   },

//   location: {
//     type: String,
//     required: true,
//   },

//   type: {
//     type: String,
//     required: true,
//   },

//   imageUrl: {
//     type: String,
//     required: true,
//   },

//   postedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// })

class Item {
  constructor(id, title, description, category, location, type, imageUrl, postedBy) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.location = location; // { lat: number, lng: number }
    this.type = type; // 'lost' or 'found'
    this.imageUrl = imageUrl;
    this.postedBy = postedBy; // userId
    this.createdAt = new Date().toISOString();
  }
}

module.exports = Item;
