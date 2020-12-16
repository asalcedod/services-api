const multer = require('multer');

const User = require('../models/user.model')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        fs.mkdir('./uploads/profiles', function (err) {
            if (err) {
                console.log(err.stack)
            } else {
                callback(null, './uploads/profiles');
            }
        })
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    if (body.path) {
        const upload = multer({ storage: storage }).single('path');
        upload(req, res, (err) => {
            if (err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}

updateUser = async (req, res) => {
    const body = req.body

    if (!body) {
        if (body.path) {
            const upload = multer({ storage: storage }).single('path');
            upload(req, res, (err) => {
                if (err) {
                    return res.end("Error uploading file.");
                }
                res.end("File is uploaded");
            });
        }
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }
        user.identification = body.identification
        user.username = body.username
        user.email = body.email
        user.name = body.name
        user.path = body.path
        user.password = body.password
        user.status = body.status
        user.rol = body.rol
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            })
    }).populate("rol")
}

deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).populate("rol").catch(err => console.log(err))
}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).populate("rol").catch(err => console.log(err))
}

getUserByIdentification = async (req, res) => {
    const login = await User.findOne({ username: req.params.username, password: req.params.password }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).populate("rol").catch(err => console.log(err))
}

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found!` })
        }
        return res.status(200).json({ success: true, data: users })
    }).populate("rol").catch(err => console.log(err))
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
    getUserByIdentification,
}