const { Router } = require('express');
const blogRouter = Router();

const {
    createBlog,
    readallBlogs,
    readBlogById,
    putBlog,
    patchBlog,
    deleteBlog,
} = require('../handlers/blog')

// create blogs
blogRouter.post('/', createBlog)

//read blogs
blogRouter.get('/', readallBlogs)

//read blogsId
blogRouter.get('/:blogId', readBlogById)

// update both
blogRouter.put('/:blogId', putBlog)

// update any one
blogRouter.patch('/:blogId', patchBlog)

// Delete Blog
blogRouter.delete('/:blogId', deleteBlog)

module.exports = {
    blogRouter,
}