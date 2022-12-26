const router =  require("express").Router() ;
const Post = require("../models/Post");
const User = require("../models/User");

//create a post

router.post("/", async(req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch(e){
        res.status(500).json(e);
    }
})

//update a post

router.put("/:id", async(req,res)=>{

    try{
        const post = await Post.findById(req.params.id);

        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).json("post updated");
        }
        else{
           res.status(403).json("you can update only your post"); 
        }
    }
    catch(e){
        res.status(500).json(e);
    }
    
})

//delete a post

router.delete("/:id", async(req,res)=>{

    try{
        const post = await Post.findById(req.params.id);

        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("post has been deleted");
        }
        else{
           res.status(403).json("you can delete only your post"); 
        }
    }
    catch(e){
        console.log(e.message);
        res.status(500).json(e);
    }
    
})

//like or unlike a post

router.put("/:id/like",  async(req,res)=>{

    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push : {likes : req.body.userId}});
            res.status(200).json("post liked");
        }
        else{
            await post.updateOne({$pull : {likes: req.body.userId}});
            res.status(200).json("post unliked");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})

//get a post

router.get("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json(err);
    }
})

//get timeline posts

router.get("/timeline/:userId", async(req,res)=>{
    try{
        const currUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId : currUser.id});
        const friendPosts = await Promise.all(
            currUser.following.map(friendId =>{
               return Post.find({userId : friendId });
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts));
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

//get usera all posts

router.get("/profile/:username", async(req,res)=>{
    try{
        const user = await User.findOne({username: req.params.username});
        const posts = await Post.find({userId : user._id}); 
        res.status(200).json(posts);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;