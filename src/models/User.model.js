const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("../config");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: value => {
                if (!validator.isEmail(value)) {
                    throw new Error({ error: 'Invalid Email address' })
                }
            }
        },
        password: {
            type: String,
            required: true,
            minLength: 7
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        tel: {
            type: String,
            trim: true,
            required: true
        },
        salary: {
            type: String,
            required: true,
            trim: true
        },
        photoLink: {
            type: String,
            trim: true,
            required: false
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }],
        area: {
            type: Schema.Types.ObjectId,
            ref: "Area",
            required: true
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this;
    const jwt_key = config.jwtKey;
    const token = jwt.sign({ _id: user._id }, jwt_key);
    var tokens = user.tokens;
    if (tokens.length > 9) {
        tokens = tokens.slice(tokens.length - 9);
    }
    user.tokens = tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;