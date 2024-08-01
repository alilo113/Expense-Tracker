const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,  // Use 'required' instead of 'require'
        unique: true
    },
    email: {
        type: String,
        required: true,  // Use 'required' instead of 'require'
        unique: true
    },
    password: {  // Correct the field name here
        type: String,
        required: true  // Use 'required' instead of 'require'
    }
});

userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {  // Fixed 'passowrd' to 'password'
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);  // Fixed 'passowrd' to 'password'
        }
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);  // Fixed 'passowrd' to 'password'
};

const User = mongoose.model("User", userSchema);  // Fixed model name to 'User'
module.exports = User;  // Fixed export statement