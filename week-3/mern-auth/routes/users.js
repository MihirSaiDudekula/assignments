//router
const express = require('express');
const router = express.Router();

//model
const User = require('../models/User');

// auth
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const authMiddleware = require('../middleware/userAuth')


// Create a new user
router.post('/signup', async (req, res) => {
	const username = req.body.username;
    const password = req.body.password;

    try {
    	await User.create({
    		username:username,
    		password:password
    	})
    	res.json({
        message: 'Admin created successfully'
    	})
    } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/*note, our middleware can only come into play later if our user first
signs in and jwt is generated
*/
router.post('/signin', async (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    // console.log(JWT_SECRET);

    const user = await User.find({
        username,
        password
    })
    if(user)
    {
    	const jwtoken = jwt.sign({username,password},JWT_SECRET)
    	//json web token string created
    	//you might wanna omit password 
    	res.json({token}) 
    }
    else 
    {
	    res.status(411).json({
	        message: "Incorrect email and pass or user doesnt exist"
	    })
    }

});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get items possessed by the signed-in user
router.get('/myitems', userAuthMiddleware, async (req, res) => {
    try {
        const username = req.user.username; // Retrieve username from the JWT. this has come from our middleware 

        const user = await User.findOne({ username });
        //see if there is any user with that name in the db
        //if yes obtain that obj into user
        if (user) {
        	//remember, we search user in user database(table)
        	//and items in item database
            const items = await Item.find({ user: user._id });
            res.json(items);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
