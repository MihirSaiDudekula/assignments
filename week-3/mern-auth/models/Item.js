const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  // itemID:mongoose.Schema.Types.ObjectId,
  // mongoose automatically makes an _id for all documents
  itemName: String,
  itemPrice: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 
  // Reference to the User model
  //used later for determining whose item this is
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
