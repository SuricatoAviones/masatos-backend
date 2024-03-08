import Role from '../models/Role';
import User from '../models/User';
import  jwt  from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const signUp = async (req, res) => {
    try {
        
      // Mostrar mensajes de error de express validator
      const errores = validationResult(req);
      if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
      }
      const { username, email, password,disponibility ,roles } = req.body;
    
        // Creating a new User Object
        const newUser = new User({
          username,
          email,
          disponibility,
          password,
        });
    
        // checking for roles
        if (roles) {
          const foundRoles = await Role.find({ name: { $in: roles } });
          newUser.roles = foundRoles.map((role) => role._id);
        } else {
          const role = await Role.findOne({ name: "user" });
          newUser.roles = [role._id];
        }
    
        // Saving the User Object in Mongodb
        const savedUser = await newUser.save();
    
        // Create a token
        const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
          expiresIn: 86400, // 24 hours
        });
    
        return res.status(200).json({ newUser,token });
      } catch (error) {
        return res.status(500).json(error.message);
      }
    
}
export const signin = async (req, res) => {
    try {
        // Request body email can be an email or username
        const userFound = await User.findOne({ email: req.body.email }).populate(
          "roles"
        );
    
        if (!userFound) return res.status(400).json({ message: "User Not Found" });
    
        const matchPassword = await User.comparePassword(
          req.body.password,
          userFound.password
        );
    
        if (!matchPassword)
          return res.status(401).json({
            token: null,
            message: "Invalid Password",
          });
    
        const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
          expiresIn: 86400, // 24 hours
        });
        const id = userFound._id
        const usuario = userFound.roles
        const username = userFound.username
        const email = userFound.email
        const disponibility = userFound.disponibility
        res.json({id, username,email,usuario, disponibility ,token});

      } catch (error) {
        console.log(error);
      }

}