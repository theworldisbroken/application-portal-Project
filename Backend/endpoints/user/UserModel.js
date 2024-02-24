const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema({
    userID: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    password: { type: String, required: true },
    isAdministrator: { type: Boolean, default: false },
    avatar: String
});

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next()
    };
    bcryptjs.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcryptjs.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;