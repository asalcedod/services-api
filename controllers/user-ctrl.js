const fs = require('fs')
const User = require('../models/user.model')

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new User(body)

    if (req.file) {
        const { filename } = req.file
        user.setImageUrl(filename)
    }

    if (!user) {
        return res.status(400).json({ success: false, error: err })
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
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({ _id: req.params.id }, (err, usr) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }

        const user = new User(usr)
        user.identification = body.identification
        user.username = body.username
        user.email = body.email
        user.name = body.name
        user.password = body.password
        user.status = body.status
        user.rol = body.rol
        if (req.file) {
            if (user.imageUrl) {
                const arr = user.imageUrl.split("/")
                const path = `./uploads/${arr[arr.length-1]}`
                fs.unlink(path, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            }
            const { filename } = req.file
            user.setImageUrl(filename)
        }
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