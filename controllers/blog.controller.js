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
const blogCreatePost = async (req, res) => {
    const { title, body } = req.body
    const blog = new Blog({body, title});
    try {
        await blog.save();
        res.redirect("/blog")
    } 
    catch (err) {
        console.error(err)
    }
}
const blogDetails = (req, res) => {
    const { id } = req.params;
    Blog.findById(id)
     .then(blog => res.render('blog/details', { blog }))
     .catch(err => console.error(err));
}

module.exports = {
    blogIndex,
    blogCreateGet,
    blogCreatePost,
    blogDetails,
}