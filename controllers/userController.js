"use strict";
const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const crypto = require("crypto");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const messagingServiceSID= process.env.messagingServiceSid;
const client = require("twilio")(accountSid, authToken);
const smsKey = process.env.SMS_SECRET_KEY;
const cloudinary = require("../utils/cloudinary");
const upload = require('../utils/Multer');
const axios =require('axios') ;

exports.Login = async (req, res) => {
  try {
    const  phone  = req.body.phone;
    const  username  = req.body.username;

    

    const user = await User.findOne({
      phone: phone.toString().toLowerCase(),
      deleted: false,
    });
    if (user) {
      return res.status(StatusCodes.OK).json({
        data: sendOTP(phone),
        
        user: user,
        data2: sendWati(phone,username),
        message: "Login successfull",
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        data: phone,
        message: "Mobile number not found",
      });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
      message: "Error in signing up",
    });
  }
};

exports.Signup = async (req, res) => {
  try {
    const { username, email, phone } = req.body;
    const isUserExists = await User.findOne({
      phone: phone.toString().toLowerCase(),
    });
    if (isUserExists) {
      return res.status(StatusCodes.CONFLICT).json({
        data: isUserExists,
        message: "Mobile number already taken",
      });
    }
    const newUser = new User({
      username: username,
      email: email,
      phone: phone,
    });
    await newUser.save();
    if (newUser) {
      return res.status(StatusCodes.OK).json({
        data: sendOTP(phone),
        data2: sendWati(phone,username),
        user: newUser,
        message: "Signup successfull",
	
        
      });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
      message: "Error in login",
    });
  }
};




 
const sendOTP = (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const sotp= otp.toString()
  const ttl = 2 * 60 * 1000;
  const expires = Date.now() + ttl;
  const data = `${phone}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", smsKey).update(data).digest("hex");
  const fullhash = `${hash}.${expires}`;
  console.log(otp,"otp")
  const res =  axios.get(`http://sms.xcelmarketing.in/api/SmsApi/SendSingleApi?UserID=kubeonline&Password=xsnr9130XS&SenderID=KBEOTP&Phno=${phone}&Msg=Use OTP ${otp} to log/reg into your KUBE account. Do not share the OTP or your number with anyone including the KUBE crew!&EntityID=1501409430000044110&TemplateID=1507165665919228229`);

 // res.data.json; 
  return { phone, hash: fullhash ,res};




}



exports.profileUpload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send({
        message: "Please upload a CSV file!",
      });
    }
    let user = await User.findById(req.body.userId);

    if(user.cloudinary_id)
    {
    await cloudinary.uploader.destroy(user.cloudinary_id);
    }
    

    const upload_result = await cloudinary.uploader.upload(req.file.path);
    const result = await User.updateOne(
      { _id: req.body.userId },
      {
        image: upload_result.secure_url ,
        cloudinary_id: upload_result.public_id,
      }
    );
    console.log(result);
    return res.status(200).send({
      file: upload_result.secure_url,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
      error: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const phone=req.query.phone;
    const username=req.query.username;

    
    const result = await User.findOne({ phone: `+${phone}` });
    return res.status(StatusCodes.OK).json({
      data: result,
      //data2: sendWati(phone,username),

      message: "User fetched successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
      message: "Error in get user",
    });
  }
};

const sendWati = (phone,username) => {
  
  const data = {
    template_name: "gifting",
    broadcast_name: "order_update",
    parameters:[{name:"name",value:username}],
    
};
const result= axios.post(`https://live-server-10710.wati.io/api/v1/sendTemplateMessage?whatsappNumber=${phone}`, data, {
    headers: {
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYTI1ODc3OS0yYThjLTRiNWMtYThjMS01NzU3NzcxMzE0OWYiLCJ1bmlxdWVfbmFtZSI6InJhaHVsQGt1YmVvbmxpbmUuaW4iLCJuYW1laWQiOiJyYWh1bEBrdWJlb25saW5lLmluIiwiZW1haWwiOiJyYWh1bEBrdWJlb25saW5lLmluIiwiYXV0aF90aW1lIjoiMDcvMTMvMjAyMiAxMToxMDozOCIsImRiX25hbWUiOiIxMDcxMCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFETUlOSVNUUkFUT1IiLCJleHAiOjI1MzQwMjMwMDgwMCwiaXNzIjoiQ2xhcmVfQUkiLCJhdWQiOiJDbGFyZV9BSSJ9.oKbmCPFzthAjVVtw1wNOwVyqrRcs_r52alnQMWzvnvc"
    },
  })

 // res.data2.json; 
  return { result};



}


exports.updateUser = async (req, res) => {
  try {
    await User.updateOne(
      {
        _id: req.body.id,
      },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
        },
      }
    ).exec();
    const user = await User.findOne({ _id: req.body.id });
    return res.status(StatusCodes.OK).json({
      data: user,
      message: "User update successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
      message: "Error in get user",
    });
  }
};

exports.likeShop = async (req, res) => {
  try {
    const result = await User.updateOne(
      {
        _id: req.body.user.toString()
      },
      {
        $addToSet: {
          favouriteStores: req.body.store
        }
      },
      {
        upsert: true
      }
    );
    if (!result.matchedCount) {
      return res.status(StatusCodes.NO_CONTENT).json({ data: [], message: 'User not found'});
    } else if (!result.modifiedCount) {
      return res.status(StatusCodes.NOT_MODIFIED).json({ data: result, message: 'Store not added'});
    } else {
      return res.status(StatusCodes.OK).json({ data: result, message: 'Store added to wishlist' });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message, message: 'Error in adding Store to wishlist' });
  }
}

exports.unlikeShop = async (req, res) => {
  try {
    const result = await User.updateOne(
      {
        _id: req.body.user.toString()
      },
      {
        $pull: {
          favouriteStores: req.body.store
        }
      }
    );
    if (!result.matchedCount) {
      return res.status(StatusCodes.NO_CONTENT).json({ data: [], message: 'User not found'});
    } else if (!result.modifiedCount) {
      return res.status(StatusCodes.NOT_MODIFIED).json({ data: result, message: 'Store not found'});
    } else {
      return res.status(StatusCodes.OK).json({ data: result, message: 'Store removed from wishlist' });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message, message: 'Error in removing Store from wishlist' });
  }
}

// api for add coin to an account

exports.creditCoin = async (req, res) => {
  try {
    await User.updateOne(
      {
        phone: req.body.phone,
      },
      {
        $inc: {
          kubecoin: req.body.kubecoin,
          
        },
      }
    ).exec();
    const user = await User.findOne({ phone: req.body.phone });
    return res.status(StatusCodes.OK).json({
      data: user,
      message: "Coin Credit successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
      message: "Error in get user",
    });
  }
};

// debit coin
exports.debitCoin = async (req, res) => {
  try {
    await User.updateOne(
      {
        phone: req.body.phone,
      },
      {
        $inc: {
          kubecoin: -req.body.kubecoin,
          
        },
      }
    ).exec();
    const user = await User.findOne({ phone: req.body.phone });
    return res.status(StatusCodes.OK).json({
      data: user,
      message: "Coin Debit successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
      message: "Error in get user",
    });
  }
};