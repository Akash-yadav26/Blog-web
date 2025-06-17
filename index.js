const path = require('path');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const express = require('express');
const app = express();
const PORT = 8000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/auth');
const Blog = require('./models/blog')

app.set("view engine",'ejs');
app.set('views',path.resolve('./views'));

mongoose
.connect('mongodb://localhost:27017/blogify')
.then((e)=>console.log("mongodb connected"));

app.use(cookieParser());

app.use(checkForAuthenticationCookie('token'));
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.resolve('./public'))) // this code is to tell that we can use  public folder as static



app.get('/',async(req,res)=>{
      const allBlogs = await Blog.find({});

    return res.render('home',{
          user: req.user,
          blogs: allBlogs,
     });
});

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(PORT,()=> console.log(`Server started at ${PORT}`));