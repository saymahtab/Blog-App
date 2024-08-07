const { Blog } = require('../models/blog.model');

const blogIndex = (req, res) => {
    Blog.find()
        .then((blogs) => {
            res.render('blog/index', { blogs })
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send();
        })
}

const blogCreateGet = (req, res) => {
    res.render('blog/new')
}

module.exports = {
    blogIndex,
    blogCreateGet,
}