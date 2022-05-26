const express = require("express")
const { append } = require("express/lib/response")
const app = express()
const body_parser = require("body-parser")
const multer = require("multer")
const res = require("express/lib/response")
const upload = multer()
const mongoose = require ("mongoose")
var session = require("express-session")

mongoose.connect('mongodb://localhost/my_db')

//set viw engine//
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(body_parser.json())
app.use(upload.array())
app.use(body_parser.urlencoded({extended:true}))
app.use (session({
    secret: "gfjdjcjkdjjcjc",
    resave:true,
    saveUninitialized:true
}))

var userSchma = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type:String, unique:true},
    username: { type:String, unique:true},
    password:String,
    balance: Number
})
 var user = mongoose.model("user",userSchma)






app.get("/", function(req,res){
    res.render("index")
})
app.get("/profile", function(req,res){
    if (req.session.user){
        var data = req.session.user
        console.log(data)
        res.render("profile",{data:data})
    }
    else{
        res.send("you must login")
    }
})

app.post("/register",function(req,res){
    var data = req.body
   
     var empty_fields =[]
     for (let i in data){
         if (data[i] === ""){
             empty_fields.push(i)
         }
     }
     if (empty_fields.length > 0){
         res.send("The following fileds are required "+ empty_fields.join())
     }

     if (data["password"] != (data["password2"])) {
        res.send ("password doesnt match")
    } 
    if (data["password"].length < 6){
        res.send("Password too short, must be 6 or more characters")
    }
    else{
        var new_user = new user({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            username: data.username,
            password: data.password,
            balance:10000

        })
        console.log(data.firstname)
        console.log(new_user)
        new_user.save()
        res.send("registration sucessfull")
    }
     
})
app.post("/login", async function(req,res){
    var data = req.body
   var user_exists =await user.findOne({email:data.email})
   if (user_exists === null){
       res.send("email not register")
   }
   else{
       if(user_exists.password === data.password){
           req.session.user = user_exists
           req.session.save()
           res.send("password correct")
       }
       else{
           res.send("password incorrect")
       }
   }
   
})

app.post("/transfer", function(req, res){
    var form = req.body
    console.log(form)
    res.send("submitted")
})

app.listen(3000)