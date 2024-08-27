import { JWT_SECRET } from "../config/config.js";
import { User } from "../models/models.js";
import { signupSchema, signinBody  } from "../validators/user.js";

export const getAllUsers = async (req, res) => {
// maybe our url goes as http://example.com/api/users?filter=John

    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            {
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                }
            }]
    });
    res.status(200).json({
        user: users.map(user => (
            {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }
        ))
    });
}

export const signup = async (req, res) => {
    const body = req.body;
    //this is zods method btw,checks if body is in correct format
    const { success } = signupSchema.safeParse(body);
    if (!success){
        return res.json({
            message: "Incorrect inputs",
        });
    }

    const user = User.findOne({
        username: body.username
    })
    if(user._id){
        return res.json({
            message: "Email already taken",
        });
    }

    // User Creation
    const dbUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    const userId = dbUser._id;

    // Account creation (creating a default account with some money)
    // so far me made the user, now we make the account , with some random amount of money
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET);
    res.status(200).json({
        message: "New user created",
        token: token,
    });
}

export const signinController = async(req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.bod.password
    });

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
        res.json({
            message: "Signed in successfully",
            token: token
        });
        return;
    }
    res.status(411).json({
        message: "Error while loggin in"
    });
}
