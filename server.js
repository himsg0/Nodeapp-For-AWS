const app = require("./app");
const dotenv = require("dotenv");




//config


dotenv.config({path:"config/config.env"});

const connectDatabase= require('./models/db');

connectDatabase();

app.get('/',(req,res)=>{
    res.send("welcome to Kube")
})

// SSL connection 
const port= process.env.PORT || 3000;

app.listen(port,()=>{

    console.log('server is working on http://localhost:'+`${process.env.PORT}`)
 
});
