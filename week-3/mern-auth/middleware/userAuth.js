const jwt = require('jsonwebtoken')
const {JWT_SECRET} = 

const userAuthMiddleware = (req,res,next) => {
    const authtoken = req.headers.authorization;
    const splitArray = authtoken.split(' ')	
    const token = splitArray[1]

    try
    {
    	const decryptedObj = jwt.verify(token,JWT_SECRET)
    	if(decryptedObj.username)
    	{
    		//lets give this req object forward to other routes
    		//but before that, now that we have authenticated and decoded
            //we have to give the subsequent requests the decoded content
            // Attach user info to the request object
            req.user = decryptedObj;
            //now the other routes,provided auth is done right, can access the decoded user obj using req.user            
    		next();
    	}
    	else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    }
    catch(e)
    {
    	res.json({
            msg: "Incorrect inputs",
            error:e.message
        })
    }
}