const User = require('../models/user.model')
const bcrypt = require('bcrypt');

module.exports.getAll = async (req, res) => {
    const results = await User.find()
    if(results.length === 0){
        return res.status(400).json({message: 'No users found'})
    }
    res.status(200).json(results)
}

module.exports.getOne = async (req, res) => {
    if(!req.params.id) return res.status(400).json({message: 'Id is null'})
    const user = User.findOne({_id:req.params.id})
    if(!user) return res.status(400).json({message: 'User not found'})
    res.status(200).json(result)
}

module.exports.updateOne = async (req, res) => {
    if (!req.body.id || !req.body.email || !req.body.password) {
        return res.status(400).json({message: 'Email and or password are null'})
    }
    const userExists = await User.findById(req.body.id).exec()
    if(!userExists) return res.status(400).json({message: 'User not found'})

    const duplicateEmailExists = await User.findOne({email: req.body.email}).exec()
    if(duplicateEmailExists) {
        return res.status(400).json({message: 'That email already exists'})
    }    

    const updateMe = await userExists.save()
    if(updateMe) { res.status(200).json(result) } 
    else { res.status(400).json({message: 'Update failed'}) }
    }

module.exports.deleteOne = async (req, res) => {
    if(!req.body.id) return res.status(400).json({message:'Id is null'})

    const userExists = await User.findById(req.body.id).exec()

    if(!userExists) {
        return res.status(400).json({message:'User not found'})
    }

    const user = await user.deleteOne()
    User.findByIdAndDelete({ _id: req.body.id})
    .then(item => res.status(200).json({message:`Successfully deleted ${item.email}`}))
    .catch(err => res.status(400).json({message:'Delete failed', ...err}))
}

module.exports.createOne = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({message: 'Email and or password are null'})
    }
    const duplicateExists = await User.findOne({email: req.body.email}).exec()
    if(duplicateExists) {
        return res.status(400).json({message: 'User with this email already exists'})
    }
    const hashedPwd = await bcrypt.hash(req.body.password, 10)
    const result = await User.create({
        email:req.body.email,
        password:hashedPwd
    })
    if(result) {
        res.status(200).json({message: 'User created'})
    } else {
        res.status(400).json({message: 'User creation failed'})
    }
}

module.exports.login = async (req, res) => {
    if(!req.body.email || !req.body.password) return res.status(400).json({message: 'Email and password are null'})

    const user = await User.findById(req.body.id).exec()
    if(!user) return res.status(200).json({message: 'User not found'})

    let match = await bcrypt.compare(req.body.password, user.password)
            
    if(!match) return res.status(400).json({message: 'Password does not match'})
            
    res.status(200).send('Login Success')
}
