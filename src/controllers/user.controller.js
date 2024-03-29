import User from "../models/User";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
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
};

export const getUsers = async (req, res) => {
  if (!req.query) {
    const users = await User.find();
    return res.json(users);
  } else {
    const data = req.query;
    const users = await User.find(data);
    res.json(users);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "No Encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const updateUserById = async (req, res) => {
  try {
    if (!req.body.password) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      if (!updatedUser) {
        return res.status(404).json({ msg: "No Encontrado" });
      }
      res.status(200).json(updatedUser);
    } else {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(req.body.password, salt);
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: newPassword,
          disponibility: req.body.disponibility,
        },
      });
      if (!user) {
        return res.status(404).json({ msg: "No Encontrado" });
      }

      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  try {
    await user.deleteOne();
    res.json({ _id: id });
  } catch (error) {
    console.log(error);
  }
};
