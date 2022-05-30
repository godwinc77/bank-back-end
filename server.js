const express = require("express")
const { append, format, type } = require("express/lib/response")
const app = express()
const body_parser = require("body-parser")
const mongoose = require ("mongoose")
var session = require("express-session")
const MongoStore = require("connect-mongo")
const fileupload = require("express-fileupload")
const path = require("path")
mongoose.connect('mongodb://localhost/my_db')

//set viw engine//
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))
app.use(fileupload())
app.use (session({
    secret: "gfjdjcjkdjjcjc",
    resave:true,
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/my_db',
        ttl: 14 * 24 * 60 * 60,
        autoREmove: "native"
    })
}))

var userSchma = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type:String, unique:true},
    username: { type:String, unique:true},
    password:String,
    balance: Number,
    avatar:{type:String, default:"\\img\\FB_IMG_1593483223797.jpg"} 
})
 var user = mongoose.model("user",userSchma)

var transferSchema = mongoose.Schema({
    amount: Number,
    sender: String,
    receiver: String,
    timestamp: {type:Date, default:Date.now}
})

var transferObj = mongoose.model("transfer", transferSchema)

var profileNameUpdateSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
})
var profileNameUpdate = mongoose.model("profileNameUpdate", profileNameUpdateSchema )

app.get("/", function(req,res){
    res.render("index")
})
app.get("/profile", async function(req,res){
    if (req.session.user){
        var data = await user.findOne({email: req.session.user.email})
        var sent_transfers = await transferObj.find({sender:data.email})
        var received_transfers = await transferObj.find({receiver:data.email})
        var all_transfers = sent_transfers.concat(received_transfers)
        var incoming = 0
        for (let i in received_transfers){
            incoming += received_transfers[i].amount
        }
        var outgoing = 0
        for (let i in sent_transfers){
            outgoing += sent_transfers[i].amount
        } 
        res.render("profile",{data:data, all_transfers:all_transfers,incoming:incoming,outgoing:outgoing})
        

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

app.post("/transfer", async function(req, res){
    var form = req.body
    var sender = await user.findOne({email: req.session.user.email})
    var receiver = await user.findOne({email: form.email})
    if (receiver){
        if(form.amount <= sender.balance){
            if (form.password === sender.password){
                await user.findOneAndUpdate({email:form.email}, {balance: receiver.balance + Number(form.amount)})
                await user.findOneAndUpdate({email:sender.email}, {balance: sender.balance - Number(form.amount)})
                var new_transfer =new transferObj({
                    sender: sender.email,
                    receiver: receiver.email,
                    amount: form.amount
                })
                new_transfer.save()
                res.send("transfer successful")
            }
            else{
                res.send("incorrect pin")
            }
        }
        else{
            res.send("not enough balance")
        }
    }
    else{
        res.send("this user doesnt exist")
    }
})

app.post("/nameupdate", async function(req, res){
    var nameUpdate =req.body
    console.log(nameUpdate)
    var empty_field =[]
    var short_names = []
    for (let i in nameUpdate){
        if (nameUpdate[i] === ""){
            empty_field.push(i)
            var string = empty_field.join(",")
        }

        if (nameUpdate[i].length < 4){
            short_names.push(i)
        }
    }
    if (empty_field.length >= 1){
        console.log(string)
        res.send(`The following fields are required ${string}`)
    }

    else if (short_names.length >= 1){
        res.send(`${short_names.join(",")} fields are too short `)
    }


    else {
        var profile = await user.findOne({email:req.session.user.email})
        profile.firstname = nameUpdate.firstname
        profile.lastname = nameUpdate.lastname
        profile.save()
        res.send("name update successful")
        }    
})
app.post("/upload", function(req,res){
    var file = req.files.avatar
    console.log(file)
    res.send("uploaded")
})

app.get("/test/:file", function(req, res){
    var file = req.params.file
    res.sendFile(__dirname + "\\public\\img\\" +file)
})

app.listen(3000)