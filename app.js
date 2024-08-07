const express = require('express');

const { blogRouter } = require('./routes/blog.route');
const { healthRouter } = require('./routes/health');
const { default: mongoose} = require('mongoose')
const { MONGO_URI } = require('./env');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))

//Routers
app.use('/health', healthRouter)
app.use('/blog', blogRouter)


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    mongoose.connect(MONGO_URI)
}
);
