const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const authorSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passward: {
        type: String,
        required: true
    }
});

authorSchema.pre('save', async function(next) {
    this.passward = await bcrypt.hash(this.passward, 10);
    next();
})
authorSchema.methods.comparePassward = function (passward) {
    return bcrypt.compare(passward, this.passward);
}

const Author = model('authors', authorSchema);
model.exports = {
    Author,
}