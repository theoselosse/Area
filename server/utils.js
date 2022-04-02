// generate token using secret from process.env.JWT_SECRET
var jwt = require('jsonwebtoken');
const User = require('./models/User');

// generate token and return it
function generateToken(user) {
//1. Don't use password and other sensitive fields
//2. Use the information that are useful in other parts
    if (!user) return null;

    var u = {
        userId: user.userId,
        username: user.username,
        email: user.email,
    };

    return jwt.sign(u, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 12 // expires in 12 hours
    });
}

// return basic user details
function getCleanUser(user) {
    if (!user) return null;

    return {
        userId: user._id,
        username: user.username,
        email: user.email,
    };
}

function verifyToken(token, res, callback) {
    if (!token) {
        return res.status(400).json({
            error: true,
            message: "Token is required."
        });
    }

    // check token that was passed by decoding token using secret
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err)
            return res.status(401).json({
                error: true,
                message: "Invalid token."
            });
        User.findOne({email: user.email}, function (err, user) {
            if (err)
                return res.send(err);
            callback(user);
        });
    });
}

/*
    // return 401 status if the userId does not match.
    User.findOne({userId: user.id}, (err, foundUser) => {
        if (foundUser) {
            console.log(foundUser.id + " " + foundUser.email + " " + foundUser.username)
        }
        if (!foundUser || user.userId !== foundUser.userId) {
            return res.status(401).json({
                error: true,
                message: "Invalid token."
            });
        } else {
            // get basic user details
            callback(foundUser);
        }
    });
});
}
*/

module.exports = {
    generateToken,
    getCleanUser,
    verifyToken
}