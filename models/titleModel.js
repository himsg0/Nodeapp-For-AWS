const mongoose=require('mongoose');



const titleSchema= new mongoose.Schema({
    hometitle:[
        {
            
            titles:{
                type:String,
                required:true
            },
        }
    ],
    
    createdAt: {
    type: Date,
    default: Date.now,
  }
    

    
});


module.exports = mongoose.model("title", titleSchema);