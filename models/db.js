const mongoose=require('mongoose');

const URI="mongodb://admin:M9ED0THWL5P0D9QRUEZS@Kubeshop.in:27017/Kubeproject?authSource=admin";





const connectDatabase=()=>{

    mongoose.connect(URI,{useUnifiedTopology:true,
        useNewUrlParser: true}).then((data)=>{
            console.log(`Mongodb connected with server: ${data.connection.host}`);
        }).catch((err)=>{
            console.log(err)
        })
    
    

}



module.exports = connectDatabase;