const { MongoClient, ObjectId } = require('mongodb');  //first step to connect to db
const { MONGO_URI } = require('../env');
const { BLOG_DB, BLOG_COL } = require('../constants');

const createBlog = async (req, res) => {
    const { body } = req;
    const { author, content } = body;

    if(!(author && content)) {
        return res.status(400).send();
    }
    const client = new MongoClient(MONGO_URI)  // Second Step - create client object - instance

    try {
        const blogDb = client.db(BLOG_DB);   // get db from clent
        const blogs = blogDb.collection(BLOG_COL);  // get collection from db
        const result = await blogs.insertOne({ author, content });
        console.log(`Inserted ${{author, content}} into blog, with _id ${result.insertedId}`)

        res.status(201).json({_id: result.insertedId}).send();

    } catch (err) {
        console.log(err);
        res.status(500).send('!OK');
    }
    finally {
        await client.close();
    }
}

const readallBlogs = async (req, res) => {
    const client = new MongoClient(MONGO_URI) 
    try {
        const blogDb = client.db(BLOG_DB); 
        const blogs = blogDb.collection(BLOG_COL); 
        const cursor = blogs.find({})
        const result = await cursor.toArray();

        res.status(201).json(result).send();

    } catch (err) {
        console.log(err);
        res.status(500).send('!OK');
    }
    finally {
        await client.close();
    }
};

const readBlogById = async (req, res) => {
    let { blogId } = req.params
    const client = new MongoClient(MONGO_URI) 
    try {
        blogId = new ObjectId(blogId)
        const blogDb = client.db(BLOG_DB); 
        const blogs = blogDb.collection(BLOG_COL); 
        const result = await blogs.findOne({_id: blogId})

        res.status(201).json(result).send();

    } catch (err) {
        console.log(err);
        res.status(500).send('!OK');
    }
    finally {
        await client.close();
    }
};

const putBlog = async (req, res) => {
    let {author, content} = req.body;
    let { blogId } = req.params

    if(!(author && content)) {
        return res.status(400).send();
    }

    const client = new MongoClient(MONGO_URI) 
    try {
        blogId = new ObjectId(blogId)
        const blogDb = client.db(BLOG_DB); 
        const blogs = blogDb.collection(BLOG_COL); 
        const result = await blogs.findOneAndUpdate(
            {_id: blogId}, 
            {$set: {author, content}},
            { returnDocument: "after" }
        )

        res.status(201).send('OK');

    } catch (err) {
        console.log(err);
        res.status(500).send('!OK');
    }
    finally {
        await client.close();
    }
};

const patchBlog = async (req, res) => {
    let {author, content} = req.body;
    let { blogId } = req.params;

    if(!(author || content)) {
        return res.status(400).send();
    }
    const updateDoc = {};
    if(author) updateDoc.author = author;
    if(content) updateDoc.content = content;
 
    const client = new MongoClient(MONGO_URI) 
    try {
        blogId = new ObjectId(blogId)
        const blogDb = client.db(BLOG_DB); 
        const blogs = blogDb.collection(BLOG_COL); 
        const result = await blogs.findOneAndUpdate(
            {_id: blogId}, 
            {$set: updateDoc},
            { returnDocument: "after" }
        )

        res.status(201).json(result).send();

    } catch (err) {
        console.log(err);
        res.status(500).send('!OK');
    }
    finally {
        await client.close();
    }
};

const deleteBlog = async (req , res) => {
    let { blogId } = req.params
    const client = new MongoClient(MONGO_URI) 
    try {
        blogId = new ObjectId(blogId)
        const blogDb = client.db(BLOG_DB); 
        const blogs = blogDb.collection(BLOG_COL); 
        const result = await blogs.findOneAndDelete({_id: blogId})

        res.status(201).json(result).send();

    } catch (err) {
        console.log(err);
        res.status(500).send('!OK');
    }
    finally {
        await client.close();
    }
};

module.exports = {
    createBlog,
    readallBlogs,
    readBlogById,
    putBlog,
    patchBlog,
    deleteBlog,
}