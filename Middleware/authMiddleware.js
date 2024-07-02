import jwt from 'jsonwebtoken';
import User from '../Models/user.js'; // Adjust the path based on your project structure

export const authMiddleware = (req, res, next) => {
    // Extract token from headers
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Corrected extraction

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded user to request object
        req.user = decoded.user;

        next(); // Move to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};


export default authMiddleware;