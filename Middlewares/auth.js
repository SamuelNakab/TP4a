import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    
    if (!authHeader) {
        return res.status(401).json({ message: 'No esta autorizado' });
    }

    const token = authHeader.split(' ')[1];
    console.log(token);
    
    if (!token) {
        return res.status(401).json({ message: 'No esta autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}