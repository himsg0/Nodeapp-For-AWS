const express = require("express");
const app = express();
const errorMiddleWare = require("./middleware/error")
var cors=require('cors');
const envs = require('./config.js');
app.use(express.json())



//Route Import
const store = require("./routes/storeRouter")
const blog= require("./routes/blogRouter")
const contact=require("./routes/contactRouter")
const partner=require("./routes/partnerRoute")
const kube=require("./routes/kubeRouter")
const login = require("./routes/loginRouter")
const user = require("./routes/userRouter")
const advertise = require("./routes/advertiseRouter")
const newsletter = require("./routes/newsletterRouter")
const event = require("./routes/eventRouter")
const kubetv = require("./routes/kubeTVRouter")
const deals = require("./routes/dealsRouter")
const kubecoin = require("./routes/kubecoinRouter")
const transaction = require("./routes/transactionRouter")



app.use(cors())

//Middle-ware for Error
app.use(errorMiddleWare)
app.use(express.static("./Public")) 
console.log('/api/v1/'+`${envs.TOKEN}`)
app.use('/api/v1/'+`${envs.TOKEN}`,store,blog,contact,partner,kube,login, user, advertise,newsletter, event,kubetv,deals
,kubecoin,transaction);


module.exports = app
