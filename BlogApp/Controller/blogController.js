const blogModel = require("../Models/blogModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");


// Render blog page
exports.blogPage = (req, resp, next)=>{
    resp.render("blog");
}

// Render create blogs
exports.createBlog = asyncErrorHandler(async(req, resp, next)=>{
    const blogBody = JSON.parse(JSON.stringify(req.body))
    let blog = null
    blogBody.createdBy = req.user._id;
    if(req?.file?.filename){
        blogBody.coverImage = `/coverImages/${req.file.filename}`
        blog = await blogModel.create(blogBody)
        return resp.render("home", {user : req.user})
    }else{
        blog = await blogModel.create(blogBody)
        return resp.render("home", {user : req.user})
    }
})


// Get all blogs
exports.userBlogs = asyncErrorHandler(async(req, resp, next)=>{
    const blogs = await blogModel.find({createdBy : req.user._id});
    resp.render("userBlogs", {user : req.user, blogs : blogs});
});

//Get Blog By Name
exports.userBlogsByTitle = asyncErrorHandler(async(req, resp, next)=>{
    if(req.body.title){
       const blogs = await blogModel.find({$and : [{createdBy : req.user._id}, {title : {$regex : req.body.title, $options : "i"}}]});
       blogs.searchTitle = req.body.title;
       return resp.render("userBlogs", {user : req.user, blogs : blogs, error : "Blog Not Found"})
    }
    resp.redirect("/home")
});

// Delete blog
exports.userBlogDelete = asyncErrorHandler(async(req, resp, next)=>{
    await blogModel.findByIdAndDelete(req.params.id);
    const blogs = await blogModel.find({createdBy : req.user._id})
    resp.render("userBlogs", {user : req.user, blogs : blogs})
});

// Render Update Page
exports.updatePage = asyncErrorHandler(async(req, resp, next)=>{
    const blog = await blogModel.findById(req.params.id);
    resp.render("blogUp", {user : req.user, blog : blog});
});

exports.updateBlog = asyncErrorHandler(async(req, resp, next)=>{
    const blogBody = JSON.parse(JSON.stringify(req.body))
    let blogs = null
    if(req?.file?.filename){
        blogBody.coverImage = `/coverImages/${req.file.filename}`
        await blogModel.findByIdAndUpdate(req.params.id, {$set : blogBody});
        blogs = await blogModel.find({createdBy : req.user._id})
        return resp.render("userBlogs", {user : req.user, blogs : blogs})
    }else{
        await blogModel.findByIdAndUpdate(req.params.id , {$set : blogBody});
        blogs = await blogModel.find({createdBy : req.user._id})
        return resp.render("userBlogs", {user : req.user, blogs : blogs})
    }
})