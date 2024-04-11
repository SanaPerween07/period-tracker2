import {Schema, model} from "mongoose"
import * as bcrypt from "bcrypt"


const signupModel = Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8 
    }
})

// always hash the pswd.
signupModel.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if modified

    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
});

// use this model to signup a user.
export const User = model('User', signupModel);