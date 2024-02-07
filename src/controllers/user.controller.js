import User from '../models/User'

export const createUser = async (req,res) =>{
    try {
        const { username, email, password, roles } = req.body;
    
        const rolesFound = await Role.find({ name: { $in: roles } });
    
        // creating a new User
        const user = new User({
          username,
          email,
          password,
          roles: rolesFound.map((role) => role._id),
        });
    
        // encrypting password
        user.password = await User.encryptPassword(user.password);
    
        // saving the new user
        const savedUser = await user.save();
    
        return res.status(200).json({
          _id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
          roles: savedUser.roles,
        });
      } catch (error) {
        console.error(error);
      }  
}

export const getUsers = async (req, res) => {
    
    if(!req.query){
      const users = await User.find();
      return res.json(users);
    } else{
      const data = req.query;
      const users = await User.find(data);
      res.json(users)
    }
};
  
export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ msg: "No Encontrado" });
  }


  res.json(user);
  
};

export const updateUserById = async (req,res) =>{
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id,req.body,{
    new: true,
  });

  if (!user) {
    return res.status(404).json({ msg: "No Encontrado" });
  }

  res.status(200).json(user);

    
}

export const deleteUserById = async (req,res) =>{
   
    const {id} = req.params;
    const user = await User.findById(id)

    try {
      await user.deleteOne();
      res.json({ msg: "Usuario Eliminado" });
    } catch (error) {
      console.log(error);
    }
    
}