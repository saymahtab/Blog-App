
const blogs = [];

const createBlog = (req, res) => {
    const { body } = req;
    const { author, content } = body;
    if(author && content) {
        blogs.push({author, content});
        res.status(201).send('OK');  // 201 - post created
        return;
    }
    res.status(404).send('!OK');
}

const readallBlogs = (req, res) => {
    res.status(200).json(blogs).send();
};

const readBlogById = (req, res) => {
    let { blogId } = req.params;
    blogId -=1;
    if(blogId > 0 && blogId <= blogs.length) {
        return res.status(200).json(blogs[blogId]).send();
    }
    res.status(404).send('!OK');
};

const putBlog = (req, res) => {
    let {author, content} = req.body;
    let { blogId } = req.params;
    blogId -=1;
    if(blogId > 0 && blogId <= blogs.length  && author && content) {
        blogs[blogId] = {author, content};
        return res.status(200).send('ok');
    }
    res.status(404).send('!ok')
};

const patchBlog = (req, res) => {
    let {author, content} = req.body;
    let { blogId } = req.params;
    blogId -=1;
    if(blogId > 0 && blogId <= blogs.length) {
        if(author) blogs[blogId].author = author
        if(content) blogs[blogId].content = content
        return res.status(200).send('ok');
    }
    res.status(404).send('!ok')
};

const deleteBlog = (req , res) => {
    let { blogId } = req.params;
    blogId -=1;
    if(blogId > 0 && blogId <= blogs.length) {
        blogs.splice(blogId, 1)
        return res.status(200).send('ok');
    }
    res.status(404).send('!ok')  // 404 - resource not found
};

module.exports = {
    createBlog,
    readallBlogs,
    readBlogById,
    putBlog,
    patchBlog,
    deleteBlog,
}