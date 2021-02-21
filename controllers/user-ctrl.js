const fs = require("fs");
const logger = require("../config/logger");
const User = require("../models/user.model");

createUser = (req, res) => {
  const body = req.body;

  if (Object.entries(body).length === 0 || body == null) {
    logger.error("You must provide a user");
    return res.status(203).json({
      success: false,
      error: "You must provide a user",
    });
  }

  const user = new User(body);

  if (req.file) {
    const { filename } = req.file;
    user.setImageUrl(filename);
  }

  if (!user) {
    return res.status(203).json({ success: false, error: err });
  }

  user
    .save()
    .then(() => {
      log.info(`User with ID ${user._id} was created`);
      return res.status(201).json({
        success: true,
        id: user._id,
        message: "User created!",
      });
    })
    .catch((error) => {
      logger.error(error.toString());
      return res.status(203).json({
        error,
        message: "User not created!",
      });
    });
};

updateUser = async (req, res) => {
  const body = req.body;

  if (Object.entries(body).length === 0 || body == null) {
    logger.error(`You must provide a body to update`);
    return res.status(203).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOne({ _id: req.params.id }, (err, usr) => {
    if (err) {
      logger.error(err.toString());
      return res.status(203).json({
        success: false,
        error: err,
        message: "User not found!",
      });
    }

    const user = new User(usr);
    user.identification = body.identification;
    user.username = body.username;
    user.email = body.email;
    user.name = body.name;
    user.password = body.password;
    user.status = body.status;
    user.rol = body.rol;
    if (req.file) {
      if (user.imageUrl) {
        const arr = user.imageUrl.split("/");
        const path = `./uploads/${arr[arr.length - 1]}`;
        fs.unlink(path, (err) => {
          if (err) {
            logger.error(err.toString);
            return;
          }
        });
      }
      const { filename } = req.file;
      user.setImageUrl(filename);
    }
    user
      .save()
      .then(() => {
        logger.info(`User with ID ${user._id} was created!`);
        return res.status(200).json({
          success: true,
          id: user._id,
          message: "User updated!",
        });
      })
      .catch((error) => {
        logger.error(error.toString());
        return res.status(203).json({
          success: false,
          error,
          message: "User not updated!",
        });
      });
  }).populate("rol");
};

deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      logger.error(err.toString());
      return res.status(203).json({ success: false, error: err });
    }

    if (!user) {
      logger.error(`User with ID ${req.params.id} not found`);
      return res.status(203).json({ success: false, error: `User not found` });
    }
    logger.error(`User with ID ${req.params.id} deleted`);
    return res.status(200).json({ success: true, data: user });
  })
    .populate("rol")
    .catch((err) => console.log(err));
};

getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      logger.error(err.toString());
      return res.status(203).json({ success: false, error: err });
    }

    if (!user) {
      logger.error(`User with ID ${req.params.id} deleted`);
      return res.status(203).json({ success: false, error: `User not found` });
    }
    logger.info(`User with ID ${req.params.id} found`);
    return res.status(200).json({ success: true, data: user });
  })
    .populate("rol")
    .catch((err) => console.log(err));
};

loginUser = async (req, res) => {
  const body = req.body;
  if (Object.entries(body).length === 0 || body == null) {
    logger.error(`You must provide a body to update`);
    return res.status(203).json({
      success: false,
      error: "You must provide a body to update",
    });
  }
  const login = await User.findOne(
    { username: body.username, password: body.password },
    (err, user) => {
      if (err) {
        logger.error(err.toString());
        return res.status(203).json({ success: false, error: err });
      }

      if (!user) {
        logger.error(`User ${body.username} not found`);
        return res
          .status(203)
          .json({ success: false, error: `User not found` });
      }
      logger.info(`User ${user._id} loging success`);
      return res.status(200).json({ success: true, data: user });
    }
  )
    .populate("rol")
    .catch((err) => console.log(err));
};

getUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      logger.error(err.toString());
      return res.status(203).json({ success: false, error: err });
    }
    if (!users.length) {
      logger.error(`Users not founds`);
      return res
        .status(203)
        .json({ success: false, error: `User not founds!` });
    }
    logger.info(`Users found`);
    return res.status(200).json({ success: true, data: users });
  })
    .populate("rol")
    .catch((err) => console.log(err));
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  loginUser,
};
