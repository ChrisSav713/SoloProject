const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    email: {
        type:String,
        trim: true,
        required: [true, 'Email must be included'],
        unique:true,
    },
    password:{
        type:String,
        trim:true,
        required: [true, 'Password must be included'],
        minLength: [8, 'Password must be at least 8 characters'],
    }
}, {timestamps:true})


// UserSchema.pre('save', async function(next){
//     const rounds = 10
//     const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(rounds))
//     this.password = hash
//     next()
//     })

module.exports = mongoose.model('User', UserSchema);