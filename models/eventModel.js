const mongoose=require('mongoose');



const eventSchema= new mongoose.Schema({
    eventtitle:{
        type:String,
        required:[true,"please enter Event Title"]
    },
    about:{
        type:String,
        required:[true,"Please Enter Event About"]
    },
     
    price: {
    type: String,
    },
    
    eventvenue:{
      type: String
    
    },


    ratings: {
      type: Number,
      default: 0,
    },

   numOfReviews: {
  type: Number,
  default: 0,
},

reviews: [
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    email: {
      type: String,
      
    },
   
    url: {
      type: String,
      
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
],


  onlinebooking:{
    type: String
},
agelimit:{
  type: String
}, 


termsandconditions: {
      type: String,
    },

organiser:[ 
    {
        organiser_name: {
        type: String,
        
      },
      organiser_address: {
        type: String,
        
      },
      facebook: {
        type: String,
        
      },
      instagram: {
        type: String,
        
      },
      twitter: {
        type: String,
        
      },
    }],

    brand: [{
      website:{
          type: String,
      },
      insta:{
          type: String,
      }

  }],


  category_type: {
  type: String,
  },

  genres: {
    type: String,
    required: [true, "Please Enter Genres"],
  },

  promovideo: {
    type: String,
    
  },
  
  eventdate: [{
    
    initiation_date:{
        type: String,
        
    },
    expiry_date:{
       type: String,
  }

}],
 
  
    images:[
        {
    
            primeurl:{
                type:String
            },
            secondaryurl:{
                type:String
            }

        }
    ],
    
  
  createdAt: {
    type: Date,
    default: Date.now,
  }
    

    
});


module.exports = mongoose.model("Event", eventSchema);