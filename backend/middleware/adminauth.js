import jwt from 'jsonwebtoken'

const authadmin = async(req,res,next) =>{
    try{
        const {token} = req.headers
        if (token){
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            if (decoded == process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
                next()
            }
            else{
                res.json({success:false, message:"Invalid Token"})
            }
        }
    }
    catch(e){
        res.json({success:false, message:e.message})
    }
}

export default authadmin