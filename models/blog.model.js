const { default: mongoose} = require('mongoose')

const blogSchema = new mongoose.Schema({
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
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'authors',
    },
});

const Blog = mongoose.model('blog', blogSchema);

module.exports = {
    Blog,
}