import {Schema, model} from "mongoose"
import * as bcrypt from "bcrypt"

// meant to be used internally only.
const _signupModel = Schema({
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
_signupModel.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if modified

    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
    next();
});

// meant to be used internally only.
const _singinModel = Schema({
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
    }
})

// meant to be used internally only.
const _trackModel = Schema({
    startDate: {
        type: Date,
        required: true
    },
    periodDuration: {
        type: Number,
        required: true
    },
    gapBetween2Periods: {
        type: Number,
        required: true
    }
})

// use this model to signup a user.
export const SignUpModel = model('SignUpModel', _signupModel);
// use this model to signin a user.
export const SingInModel = model('SingInModel', _singinModel)
// use this model to track periods.
export const TrackModel = model('TrackModel', _trackModel)
