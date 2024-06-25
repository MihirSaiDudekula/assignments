const mongoose = require('mongoose');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
});

const ItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Item = mongoose.model('Item', ItemSchema);

module.exports = {
    Admin,
    User,
    Item
};
