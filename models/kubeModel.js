const mongoose=require('mongoose');



const kubeSchema= new mongoose.Schema({
    
advertiseBanner: [
  {
    
    url: {
      type: String,
      required: true,
    },
    
    descroption: {
      type: String,
      required: false,
    },
  },
],

privacyPolicy:[
  {
    url: {
      type: String,
    },

    descroption: {
        type: String,
        required: false,
      },
  }
],


    
  
  createdAt: {
    type: Date,
    default: Date.now,
  }
    

    
});


module.exports = mongoose.model("kube", kubeSchema);