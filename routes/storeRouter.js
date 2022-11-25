const express =require('express');
const {getAllCity, createStore, updateStore,createsubandcat
      ,getbannerbysub , getAlllocality, getAllCategories
      ,getAlldata , createbanner, getAllsubCate,getAllcattable,getAllStoreCategories,getAllStoreSubcat
,getAllFeaturedata,getAll2Featuredata,getFashionFeature,getFashion2Feature,getPetsFeature,
getPets2Feature,getFoodandBevrageFeature,getFoodandBevrage2Feature,
getWellnessFeature,getWellness2Feature,getArtandCraftFeature,getArtandCraft2Feature,gettitledata,createStoreReview,getAllpackageSort,
getBrandApi,getAllFav,getFiveVendors, getTenVendors, storeOfferCounter, storeOfferdiscount,storeOfferdiscountcounter}= require("../controllers/storeController");

const router= express.Router();

router.route("/stores/all").get(getAlldata); // get all data by params
router.route("/stores/city").get(getAllCity); // get all distinct city
router.route("/stores/locality").get(getAlllocality);       // get locality by city
router.route("/stores/categories").get(getAllCategories);    // get all cat
router.route("/stores/subcategories").get(getAllsubCate);     // get sub cat by cat
router.route("/stores/Allcategories").get(getAllStoreCategories);    // get all cat from store
router.route("/stores/Allsubcategories").get(getAllStoreSubcat);     // get sub cat by cat store
router.route("/stores/getbanner").get(getbannerbysub);       // get banners by locality
router.route("/stores/cattable").get(getAllcattable);  
router.route("/stores/offerbydiscount").post(storeOfferdiscount);   // test offer


      

router.route("/store/banner/new").post(createbanner);        // create banner 
router.route("/store/new").post(createStore);                //create store
router.route("/store/catandsub").post(createsubandcat);                     // create cat and sub cat
router.route("/stores/:id").put(updateStore);             //update store by ID

router.route("/store/offer/counter").put(storeOfferCounter); 
router.route("/datateam/offer/counter").post(storeOfferdiscountcounter);   

// 13 API's for App commit by Himanshu on 1.04.2022

router.route("/stores/section1").get(getAllFeaturedata);                 //All Data
router.route('/stores/section2').get(getAll2Featuredata);
router.route("/stores/section3").get(getFashionFeature);                 //featured of fashion
router.route("/stores/section4").get(getFashion2Feature);               
router.route('/stores/section5').get(getPetsFeature);                       //featured of pets
router.route('/stores/section6').get(getPets2Feature);
router.route('/stores/section7').get(getFoodandBevrageFeature);       //featured of foodandBevrage
router.route('/stores/section8').get(getFoodandBevrage2Feature);
router.route('/stores/section9').get(getWellnessFeature);               //featured of Wellness
router.route('/stores/section10').get(getWellness2Feature);
router.route('/stores/section11').get(getArtandCraftFeature);         //featured of artandcraft
router.route('/stores/section12').get(getArtandCraft2Feature);
router.route('/stores/section13').get(gettitledata);                  // titles name

router.route("/review/new").put( createStoreReview);    // create store review

router.route("/package/view").get( getAllpackageSort);  // sort data by package_priority

router.route("/brand/all").get(getBrandApi);      // branded route

router.route("/user/fav").post(getAllFav); // get all fav vendor of user

router.route("/offers/gold").get(getFiveVendors); // get five % vendors
router.route("/offers/platinum").get(getTenVendors); // get TEN % vendors


module.exports=router;