import jwt from 'jsonwebtoken'
import User from '../models/User'
import Role from '../models/Role';

export const verifyToken = async (req, res, next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            // console.log(token);
    
            if(!token) return res.status(403).json({message: "No token provided"})
            
            const decoded= jwt.verify(token,process.env.SECRET);
            req.userId = decoded.id;
            
            const user = await User.findById(req.userId,{password: 0})
            if(!user) return res.status(404).json({message: "El usuario no existe"})
            next();
        } catch (error) {
            return res.status(401).json({message: 'No Autorizado'})
        }
    }
    
};

export const isModerator = async (req,res,next) =>{
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            next();
            return;
          }
        }
        return res.status(403).json({ message: "Require Moderator Role!" });
    } catch (error) {
        return res.status(500).send({ message: error });
    }
}
export const isAdmin = async (req,res,next) =>{
    try {
        const user = await User.findById(req.userId);
        const roles = await Role.find({ _id: { $in: user.roles } });
    
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
    
        return res.status(403).json({ message: "Require Admin Role!" });
      } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error });
      }
}