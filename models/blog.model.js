const { Schema, model } = require('mongoose')

const blogSchema = new Schema({
    title:{
        type: String,
        require: true,
    },
    body: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

const Blog = model('blog', blogSchema);

module.exports = {
    Blog,
}