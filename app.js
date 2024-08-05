const express = require('express');
const { blogRouter } = require('./routes/blog');
const { healthRouter } = require('./routes/health');
const app = express();
const port = 3000;

// JSON convertor
app.use(express.json())

//Routers
app.use('/health', healthRouter)
app.use('/blog', blogRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})