import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    
    if (!authHeader) {
        return res.status(401).json({ message: 'No esta autorizado' });
    }

    const token = authHeader.split(' ')[1];

    
    if (!token) {
        return res.status(401).json({ message: 'No esta autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        req.user = decoded;
        console.log(req.user);
        
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const verifyAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user.rol === 'admin') {
        next()
    }
    else{
        return res.status(401).json({ message: 'No tiene permisos de administrador' });
    }
}