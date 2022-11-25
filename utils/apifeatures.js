class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    search(){
        const keyword= this.queryStr.keyword ?{
            storename:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        }:{};

        console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
    };

    // search by debituser
    searchdebit(){
        const keyword= this.queryStr.keyword ?{
            debituser:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        }:{};

        console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
    };

    // search by multiple season
    
    searchseason(){
        const seasonkey= this.queryStr.seasonkey ?{
            season:{
                $regex:this.queryStr.seasonkey,
                $options:"i",
            },
        }:{};

        console.log(seasonkey);
        this.query=this.query.find({...seasonkey});
        return this;
    };

    //complete
    //locality fetching by city name

    locality(){
        const city = this.queryStr.city ?{
            city: this.queryStr.city
        }:{};

        console.log(city)
        this.query = this.query.distinct("locality", {...city});
        return this;

    }

// sub cat by cat
    subcat(){
        const category = this.queryStr.category ?{
            category: this.queryStr.category
        }:{};

        console.log(category)
        this.query = this.query.distinct("sub_category", {...category});
        return this;

    }

    filter() {
        const queryCopy = { ...this.queryStr };
        //   Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
    
        removeFields.forEach((key) => delete queryCopy[key]);
    
        // Filter For Price and Rating
    
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    
        this.query = this.query.find(JSON.parse(queryStr));
    
        return this;
    }
    
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
    
        const skip = resultPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resultPerPage).skip(skip);
    
        return this;
      }

//Banner fetching by city and locality


      searchBanner(){
        const city = this.queryStr.city ?{
            cityName:this.queryStr.city
        }:{};

        const locality = this.queryStr.locality ?{
            localityName: this.queryStr.locality
        }:{};

        console.log(city,locality);
        this.query=this.query.find({...city,...locality});
        return this;
    };
}

module.exports= ApiFeatures;