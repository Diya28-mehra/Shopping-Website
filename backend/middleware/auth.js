import jwt from 'jsonwebtoken';

const authUser = async (req,res,next) =>{
    const {token} = req.headers;
    if (!token) {
        return res.status(401).json({ success:false, message: 'Unauthorized' });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body = req.body || {};
        req.body.userId = decode.id;
        next();
    }
    catch (error) {
        console.log('Auth error:', error.message);
        return res.status(401).json({ success:false, message: 'Unauthorized' });
    }
}

export default authUser;