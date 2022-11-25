const req = require("express/lib/request");
const res = require("express/lib/response");
const Store= require("../models/storeModel");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { distinct } = require("../models/storeModel");
const banners= require("../models/localityModel");
const cate= require("../models/categoryModel");
const title= require("../models/titleModel");




// Create Product --Admin
exports.createStore= async(req,res,next)=>{
    const product= await Store.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}


// Create Banner
exports.createbanner= async(req,res,next)=>{
    const product= await banners.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}


// create cat and sub cat
exports.createsubandcat= async(req,res,next)=>{
    const product= await cate.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}



// get all data with params
exports.getAlldata=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(Store.find().sort({"packagepriority":1}),req.query).search().searchseason().filter();
    const products= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        products
    });
});






// get all city

exports.getAllCity=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(Store.distinct("city"),req.query);
    const products= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        products
    });
});

// to get all locality
exports.getAlllocality=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(Store.distinct(),req.query).locality();
    const products= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        products
    });
});

// get all distinct cat
exports.getAllCategories=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(cate.distinct("categories_Name"),req.query);
    const products= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        products
    });
});

// to get all_sub_categories

exports.getAllsubCate=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(cate.find({}),req.query).search().filter();
    const products= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        products
    });
});

// to get all data from cat model
exports.getAllcattable=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(cate.find({}),req.query);//.search().filter();
    const products= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        products
    });
});



// get all sub cat

// get banner by subcat

exports.getbannerbysub=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(banners.find({},{"images.url":1,_id:0}),req.query).searchBanner();
        const products= await apiFeature.query;
       
    
        res.status(200).json({
            success:true,
            products
        });
    });


		//update changes on server




// Update product
exports.updateStore= async(req,res,next)=>{
    let product= await Store.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not Found"
        })
    }

    product= await Store.findByIdAndUpdate(req.params.id,res.body,{
        new: true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product 
    })
}

// UPDATE FROM STORE MODEL

//get all cat from store
exports.getAllStoreCategories=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(Store.distinct("category"),req.query);
    const products= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        products
    });
});


// get all sub cat from store

exports.getAllStoreSubcat=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(Store.distinct(),req.query).subcat();
    const products= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        products
    });
});


// Feature API(13) Commit by"Himanshu"  ++++****++++

// all Vendors. add on 1.04.2022 controller for offers and vendors ON App

exports.getAllFeaturedata=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(Store.find(),req.query).search().filter();
    const stores= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        OffersOrVendors : false,
        
        stores
    });
});

exports.getAll2Featuredata=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(Store.find(),req.query).search().filter();
    const stores= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        OffersOrVendors : true,
        
        stores
    });
});

//Feature Fashion.

exports.getFashionFeature= catchAsyncErrors(async(req,res)=>{
    const apiFeature= new ApiFeatures(Store.find({"category":"Fashion","featured":"true"}),req.query).search().filter();
    const stores= await apiFeature.query;

    res.status(200).json({
        success:true,
        OffersOrVendors : false,
        stores
    });
});

exports.getFashion2Feature= catchAsyncErrors(async(req,res)=>{
    const apiFeature= new ApiFeatures(Store.find({"category":"Fashion","featured":"true"}),req.query).search().filter();
    const stores= await apiFeature.query;

    res.status(200).json({
        success:true,
        OffersOrVendors : true,
        stores
    });
});



//Feature Pets. 

exports.getPetsFeature= catchAsyncErrors(async(req,res)=>{
    const apiFeature= new ApiFeatures(Store.find({"category":"Pets","featured":"true"}),req.query).search().filter();
    const stores= await apiFeature.query;

    res.status(200).json({
        success:true,
        OffersOrVendors : false,
        stores
    });
});

exports.getPets2Feature= catchAsyncErrors(async(req,res)=>{
    const apiFeature= new ApiFeatures(Store.find({"category":"Pets","featured":"true"}),req.query).search().filter();
    const stores= await apiFeature.query;

    res.status(200).json({
        success:true,
        OffersOrVendors : true,
        stores
    });
});

//Feature Food and Bevrages.

exports.getFoodandBevrageFeature= catchAsyncErrors(async(req,res)=>{
    const apiFeature= new ApiFeatures(Store.find({"category":"Food and Beverages","featured":"true"}),req.query).search().filter();
    const stores= await apiFeature.query;

    res.status(200).json({
        success:true,
        OffersOrVendors : false,
        stores
    });
});

exports.getFoodandBevrage2Feature= catchAsyncErrors(async(req,res)=>{
    const apiFeature= new ApiFeatures(Store.find({"category":"Food and Beverages","featured":"true"}),req.query).search().filter();
    const stores= await apiFeature.query;

    res.status(200).json({
        success:true,
        OffersOrVendors : true,
        stores
    });
});

//Feature Beauty Wellness.

exports.getWellnessFeature= catchAsyncErrors(async(req,res)=>{
    const apiFeature= new ApiFeatures(Store.find({"category":"Wellness","featured":"true"}),req.query).search().filter();
    const stores= await apiFeature.query;

    res.status(200).json({
        success:true,
        OffersOrVendors : false,
        stores
    });
});

exports.getWellness2Feature= catchAsyncErrors(async(req,res)=>{
    const apiFeature= new ApiFeatures(Store.find({"category":"Wellness","featured":"true"}),req.query).search().filter();
    const stores= await apiFeature.query;

    res.status(200).json({
        success:true,
        OffersOrVendors : true,
        stores
    });
});



//Feature Art& Craft.

exports.getArtandCraftFeature= catchAsyncErrors(async(req,res)=>{
    const apiFeature= new ApiFeatures(Store.find({"category":"Art and Craft","featured":"true"}),req.query).search().filter();
    const stores= await apiFeature.query;

    res.status(200).json({
        success:true,
        OffersOrVendors : false,
        stores
    });
});

exports.getArtandCraft2Feature= catchAsyncErrors(async(req,res)=>{
    const apiFeature= new ApiFeatures(Store.find({"category":"Art and Craft","featured":"true"}),req.query).search().filter();
    const stores= await apiFeature.query;

    res.status(200).json({
        success:true,
        OffersOrVendors : true,
        stores
    });
});

// get all title 
exports.gettitledata=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(title.find(),req.query).search().filter();
    const stores= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        stores
    });
});

// Create New Review or Update the review
exports.createStoreReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, storeId, name, url } = req.body;
  
    const review = {
      
      rating: Number(rating),
      comment,
      name,
      url,
    };
  
    const product = await Store.findById(storeId);
  
          product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.ratings = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });


// Sort data by package_priority

exports.getAllpackageSort=catchAsyncErrors(async(req,res)=>{
    const apiFeature = new ApiFeatures(Store.find().sort({"packagepriority":1}),req.query).search().filter();
    const sortPackagedata= await apiFeature.query;
   

    res.status(200).json({
        success:true,
        sortPackagedata
    });
});

// branded Vendors

exports.getBrandApi= catchAsyncErrors(async(req,res)=>{
    const apiFeature= new ApiFeatures(Store.find({"category_type":"Brand"}),req.query);

    const brandStore= await apiFeature.query;

    res.status(200).json({
        success:true,
        brandStore
    });
});

// Get all favourite store of a user

exports.getAllFav=catchAsyncErrors(async(req,res)=>{
    const favVendorList= req.body.favVendorList
    const ObjectId = require('mongodb').ObjectId;
    const favList = await  Store.aggregate(
        [
             param =  {
                '$match': {
                '_id': {
                    '$in': createVendorList(favVendorList)
                }
                }
            }
          ]
    )
    function createVendorList(favVendorList){
        var favVendorFinalAry = [];
        for(let i =0; i< favVendorList.length;i++){
            favVendorFinalAry.push(new ObjectId(favVendorList[i]))
        }
        return favVendorFinalAry;
        
    }
    res.status(200).json({
        success:true,
        favList
    });
});


// five and ten % offers API's

exports.getFiveVendors= catchAsyncErrors(async(req,res)=>{
    const apiFeature= new ApiFeatures(Store.find({"package":"Gold"}),req.query).search().filter();
    const products= await apiFeature.query;

    res.status(200).json({
        success:true,
        products
    });
});

exports.getTenVendors= catchAsyncErrors(async(req,res)=>{
    const apiFeature= new ApiFeatures(Store.find({"package":"Platinum"}),req.query).search().filter();
    const products= await apiFeature.query;

    res.status(200).json({
        success:true,
        products    });
});

// post counter in DB

exports.storeOfferCounter = catchAsyncErrors(async (req, res, next) => {
   
    const { storeId, image } = req.body;
    const prod = await Store.updateMany({_id:storeId, offer:{$elemMatch: { image: image}}},{$inc:{"offer.$.offerCounter": 1}});
    
    console.log(prod,"hello counter")
  
    
    
    /*const prod=await Store.updateMany(
        {
          _id: storeId,
          offer: { $elemMatch: { image: image} }
        },
        { $set: { "offer.$.offerCounter" : value +1 } }
     )
    */
    res.status(200).json({
      success: true,
      prod
      
    }); 
  });


  // TEST ON OFFERS
  exports.storeOfferdiscount = catchAsyncErrors(async (req, res, next) => {
   
    const { dis, city, locality } = req.body;
    const prod = await Store.find({ offer:{$elemMatch: { offerdiscount: dis}}}).sort({"packagepriority":1});

    let results = [];
    

    
   /*   prod.forEach(avg => {
          if (city && !locality) {
              if (avg["city"] == city) {
                avg.offer.forEach(element => {
                    if (element["offerdiscount"] === dis) {
                        results.push(element)
                    }
                })
              }
          }
          else if (city && locality) {
            if(avg["city"]==city && avg["locality"]==locality){
            avg.offer.forEach(element => {
                if (element["offerdiscount"] === dis) {
                    results.push(element)
                }
            })
        }
   } })  */

   var indexes = []
   var final = []
   var storeid = []
   var discountimages=[]

   var allocality='';
   if(locality=="All Locality"){
    allocality=locality;
   }


      prod.forEach((avg, index) => {

          if (city && allocality) {

              if (avg["city"] == city) {
                  
                  //console.log(avg)
                  
                  avg.offer.forEach((element, index) => {
                      if (element["offerdiscount"] === dis) {
                          indexes.push(index)
                          storeid.push(avg._id);
                          discountimages.push(element.image)
                      }
                  })

              }
          }
          else if (city && locality) {
              if (avg["city"] == city && avg["locality"] == locality) {
                  storeid.push(avg._id);
                  
                  avg.offer.forEach((element, index) => {
                      if (element["offerdiscount"] === dis) {
                          indexes.push(index)
                          discountimages.push(element.image)
                      }
                  })

              }

          }
      });

      indexes.forEach((idx, index) => {
          const num2 = storeid[index];
          const num3 = discountimages[index];
          const person = {
              index: idx,
              id: num2,
              image: num3

          }
          final.push(person);
      });

  
    res.status(200).json({
      success: true,
      final
      
    }); 
  });

  // count offer for data team

  exports.storeOfferdiscountcounter = catchAsyncErrors(async (req, res, next) => {
   
    const { dis, city, locality } = req.body;
    const prod = await Store.find({ offer:{$elemMatch: { offerdiscount: dis}}}).sort({"packagepriority":1});

    let results = [];
    

    
   /*   prod.forEach(avg => {
          if (city && !locality) {
              if (avg["city"] == city) {
                avg.offer.forEach(element => {
                    if (element["offerdiscount"] === dis) {
                        results.push(element)
                    }
                })
              }
          }
          else if (city && locality) {
            if(avg["city"]==city && avg["locality"]==locality){
            avg.offer.forEach(element => {
                if (element["offerdiscount"] === dis) {
                    results.push(element)
                }
            })
        }
   } })  */

   var DownloadCount = []
   var final = []
   var storeid = []
   var discountimages=[]

   var allocality='';
   if(locality=="All Locality"){
    allocality=locality;
   }


      prod.forEach((avg, index) => {

          if (city && allocality) {

              if (avg["city"] == city) {
                  
                  //console.log(avg)
                  
                  avg.offer.forEach((element, index) => {
                      if (element["offerdiscount"] === dis) {
                        DownloadCount.push(element.offerCounter)
                          storeid.push(avg.storename);     
                          discountimages.push(element.image)
                      }
                  })

              }
          }
          else if (city && locality) {
              if (avg["city"] == city && avg["locality"] == locality) {
                  storeid.push(avg._id);
                  
                  avg.offer.forEach((element, index) => {
                      if (element["offerdiscount"] === dis) {
                          DownloadCount.push(element.offerCounter)
                          storeid.push(avg.storename);
                          discountimages.push(element.image)
                      }
                  })

              }

          }
      });

      DownloadCount.forEach((idx, index) => {
          const num2 = storeid[index];
          const num3 = discountimages[index];
          const person = {
              Download: idx,
              StoreName: num2,
              image: num3

          }
          final.push(person);
      });

  
    res.status(200).json({
      success: true,
      final
      
    }); 
  });



