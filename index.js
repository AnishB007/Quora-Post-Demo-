const express=require("express");
const app=express();
const port=8080;
const path=require("path");                                                //For views directory
const {v4: uuidv4}=require('uuid');                                        //For unique usernames
const methodOverride=require("method-override");                           //

app.use(express.urlencoded({extended:true}));                              //Parse URL encoded data from Post request
app.use(methodOverride("_method"));                                        //Overrides POST request with PATCH or any other request

app.set("view engine","ejs");                                              //To connect ejs files
app.set("views",path.join(__dirname,"views"));                             //So that we can run index.js from another directory

app.use(express.static(path.join(__dirname,"public")));                    //To join CSS files in public folder

let posts=[                                                                //Initial array
    {
        id:uuidv4(),
        username:"ApnaCollege",
        content:"Coding sikha diya tumko",
    },
    {
        id:uuidv4(),
        username:"Anish",
        content:"IIM Bangalore",
    },
    {
        id:uuidv4(),
        username:"Ayushi",
        content:"Google",
    },
    {
        id:uuidv4(),
        username:"Rudrajit",
        content:"I am the family man",
    },
];

app.get("/posts",(req,res)=>{                                              //Home Page(GET is used since only response is recieved)
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{                                          //Display page for new post(This page sends post request back to home page )
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{                                             //Info for new post is recieved
    let {username,content}=req.body;
    let newId=uuidv4();                                                    //New Id is created
    posts.push({newId,username,content});
    res.redirect("/posts");                                                //Redirected to home page
    res.send("Post request working");
});

app.get("/posts/:id",(req,res)=>{                                          //For showing each post specifically
    let {id}=req.params;                                                   //Query string
    let post=posts.find((p)=>id===p.id);                                   //Finding that object
    res.render("show.ejs",{post});                                         //Show it using ejs
    res.send("request working");
});

app.patch("/posts/:id",(req,res)=>{                                        //For Editing specific parts we use patch
    let {id}=req.params;                                                   
    let newContent=req.body.content;                                       //Taking the info from body of post request
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{                                     //Display page of New
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{                                       //Delete post
    let {id}=req.params;
    posts=posts.filter((p) => id != p.id);                                 //The objects with id not equal are filtered and displayed
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});

