import Role from '../models/Role';
import User from '../models/User';
export const createRoles = async () =>{
    

    try {
        const count = await Role.estimatedDocumentCount()

        if(count > 0) return;
    
        const values = await Promise.all([
            new Role({name:'moderator'}).save(),
            new Role({name:'admin'}).save(),
            new Role({name:'user'}).save(),


        ]);
        console,log(values);
    } catch (error) {
       console.log(error);
    }
    
}
export const createAdmin = async () => {
    // check for an existing admin user
    const userFound = await User.findOne({ email: process.env.ADMIN_EMAIL });
    console.log(userFound);
    if (userFound) return;
  
    // get roles _id
    const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });
  
    // create a new admin user
    const newUser = await User.create({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      roles: roles.map((role) => role._id),
    });
  
    console.log(`new user created: ${newUser.email}`);
};

