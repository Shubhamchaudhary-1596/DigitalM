import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generateRefreshToken from "../utils/generatedRefreshToken.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import sendEmailFun from "../config/sendEmail.js";

// Configuration
cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key: process.env.cloudinary_Config_api_key,
  api_secret: process.env.cloudinary_Config_api_secret, // Click 'View API Keys' above to copy your API secret
  secure: true,
});

//registration Email
export async function registerUserController(request, response) {
  try {
    console.log("Request body:", request.body);
    let user;
    const { name, mobile, password } = request.body;
    if (!name || !mobile || !password) {
      return response.status(400).json({
        message: "provide mobile, name, password",
        error: true,
        success: false,
      });
    }

    user = await UserModel.findOne({ mobile: mobile });
    if (user) {
      return response.json({
        message: "User already register with this mobile number",
        error: true,
        success: false,
      });
    }

    // const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    user = new UserModel({
      mobile: mobile,
      password: hashPassword,
      name: name,
      // otp: verifyCode,
      // otpExpires: Date.now() + 600000,
      verify_email: true, // Set to true to skip verification
    });
    await user.save();

    // Generate tokens for automatic login after registration
    const accesstoken = await generatedAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    // //send verification email
    // await sendEmailFun(
    //   email,
    //   "verify email from Ecommerce App",
    //   "",
    //   VerificationEmail(name, verifyCode)
    // );

    // // Create a JWT token for verification purposes
    // const token = jwt.sign(
    //   { email: user.email, id: user._id },
    //   process.env.JSON_WEB_TOKEN_SECRET_KEY
    // );

    return response.status(200).json({
      sucess: true,
      error: false,
      message: "User register successfully!",
      data: {
        accesstoken,
        refreshToken,
      },
      // token: token, // Option: include this if needed for verification
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function adminRegisterUserController(request, response) {
  try {
    // Remove the auth check to allow public registration with pendingAdmin true
    // const requesterId = request.userId; // from auth middleware
    // const requester = await UserModel.findById(requesterId);

    // if (!requester || requester.role !== "Admin" || requester.adminAccess !== true) {
    //   return response.status(403).json({
    //     message: "You do not have permission to register admin users",
    //     error: true,
    //     success: false,
    //   });
    // }

    const { name, email, password } = request.body;
    if (!name || !email || !password) {
      return response.status(400).json({
        message: "Provide name, email, and password",
        error: true,
        success: false,
      });
    }

    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return response.status(400).json({
        message: "User already registered with this email",
        error: true,
        success: false,
      });
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashPassword,
      role: "Admin",
      adminAccess: false,
      pendingAdmin: true,
   
    
    
    });

    await newUser.save();

    // Optionally send verification email or notification here

    return response.status(201).json({
      message: "Admin registration request submitted for approval",
      error: false,
      success: true,
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// Verify Email
export async function verifyEmailController(request, response) {
  try {
    const { email, otp } = request.body;
    const user = await UserModel.findOne({ email: email }).select('+otp +otpExpires');
    if (!user) {
      return response
        .status(400)
        .json({ error: true, success: false, message: "User not found" });
    }

    const isCodeValid = user.otp === otp;
    const isNotExpired = user.otpExpires > Date.now();

    if (isCodeValid && isNotExpired) {
      user.verify_email = true;
      user.otp = null;
      user.otpExpires = null;

      await user.save();

      return response.status(200).json({
        error: false,
        success: true,
        message: "Email verified successfully",
      });
    } else if (!isCodeValid) {
      return response
        .status(400)
        .json({ error: true, success: false, message: "Invalid OTP" });
    } else {
      return response
        .status(400)
        .json({ error: true, success: false, message: "OTP expired" });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Login with google
export async function authWithGoogle(request, response) {
  const { name, email, password, mobile, avatar, role } = request.body;

  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      const user = await UserModel.create({
        name: name,
        email: email,
        
        mobile: mobile,
        avatar: avatar,
        role: role,
        
        signUpWithGoogle: true,
      });

      await user.save();

      const accesstoken = await generatedAccessToken(user._id);
      const refreshToken = await generateRefreshToken(user._id);

      await UserModel.findByIdAndUpdate(user?._id, {
        last_login_date: new Date(),
      });

      const cookiesOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "None" : "Lax",
      };

      response.cookie("accessToken", accesstoken, cookiesOption);
      response.cookie("refreshToken", refreshToken, cookiesOption);

      return response.json({
        message: "Login successfully",
        error: false,
        success: true,
        data: {
          accesstoken,
          refreshToken,
        },
      });
    } else {
      const accesstoken = await generatedAccessToken(existingUser._id);
      const refreshToken = await generateRefreshToken(existingUser._id);

      await UserModel.findByIdAndUpdate(existingUser?._id, {
        last_login_date: new Date(),
      });

      const cookiesOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? "None" : "Lax",
      };

      response.cookie("accessToken", accesstoken, cookiesOption);
      response.cookie("refreshToken", refreshToken, cookiesOption);

      return response.json({
        message: "Login successfully",
        error: false,
        success: true,
        data: {
          accesstoken,
          refreshToken,
        },
      });
    }
  } catch (error) {
    console.error("Google Authentication Error:", error);
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//Login Controller
export async function loginUserController(request, response) {
  try {
    const { mobile, password, isAdminLogin } = request.body;
    const user = await UserModel.findOne({ mobile: mobile });

    if (!user) {
      return response.status(400).json({
        message: "User not register",
        error: true,
        success: false,
      });
    }
    if (user.status !== "Active") {
      return response.status(400).json({
        message: "Conatact to admin",
        error: true,
        success: false,
      });
    }
    // if (user.verify_email !== true) {
    //   return response.status(400).json({
    //     message: "Your Email is not verify yet please verify your email first",
    //     error: true,
    //     success: false,
    //   });
    // }

    if (isAdminLogin && (user.role !== "Admin" || user.adminAccess !== true)) {
      return response.status(403).json({
        message: "You do not have admin access",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);
    if (!checkPassword) {
      return response.status(400).json({
        message: "Check your password",
        error: true,
        success: false,
      });
    }

    const accesstoken = await generatedAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    // Prepare user data to return (excluding password)
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      avatar: user.avatar,
      adminAccess: user.adminAccess,
    };

    const cookiesOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? "None" : "Lax",
    };

    response.cookie("accessToken", accesstoken, cookiesOption);
    response.cookie("refreshToken", refreshToken, cookiesOption);

    return response.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshToken,
        user: userData
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// Logout Controller
export async function logoutController(request, response) {
  try {
    const userid = request.userId; //auth middleware
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.clearCookie("accessToken", cookiesOption);
    response.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
      refresh_token: "",
    });

    return response.json({
      message: "Logout successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//Image Upload
var imagesArr = [];
export async function userAvatarController(request, response) {
  try {
    imagesArr = [];

    const userId = request.userId;
    const image = request.files;

    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return response.status(500).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // Delete old avatar from Cloudinary if exists
    if (user.avatar) {
      // Extract public_id from the avatar URL
      const urlParts = user.avatar.split("/");
      const imageNameWithExtension = urlParts[urlParts.length - 1];
      const publicId = imageNameWithExtension.split(".")[0];

      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Error deleting old avatar from Cloudinary:", err);
      }
    }

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < image?.length; i++) {
      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        function (error, result) {
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${request.files[i].filename}`);
        }
      );
    }

    user.avatar = imagesArr[0];
    await user.save();

    return response.status(200).json({
      _id: userId,
      avtar: imagesArr[0],
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Delete image from cloudinary
export async function removeImageFromCloudinary(request, response) {
  const imgUrl = request.query.img;
  const urlArr = imgUrl.split("/");
  const image = urlArr[urlArr.length - 1];
  const imageName = image.split(".")[0];
  if (imageName) {
    const res = await cloudinary.uploader.destroy(
      imageName,
      (error, result) => {
        //console.log(error, res)
      }
    );
    if (res) {
      response.status(200).send(res);
    }
  }
}

//update user details
export async function updateUserDetails(request, response) {
  try {
    const userId = request.userId; //auth middleware
    const { name, email, mobile, password } = request.body;
    const userExist = await UserModel.findById(userId);
    if (!userExist) {
      return response.status(400).send("The user cannot be Update!");
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: name,
        mobile: mobile,
        email: email,
      },
      { new: true }
    );
    if (typeof email === "string" && email.trim().toLowerCase() !== String(userExist.email || "").toLowerCase()) {
      const verifyCode = String(Math.floor(100000 + Math.random() * 900000));
      updateUser.otp = verifyCode;
      updateUser.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      await updateUser.save();
      const emailSent = await sendEmailFun(
        email.trim(),
        "Verify your Webzoneo email address",
        "Your email verification code is " + verifyCode + ". It expires in 10 minutes.",
        "<p>Your email verification code is <strong>" + verifyCode + "</strong>.</p><p>It expires in 10 minutes.</p>"
      );
      if (!emailSent) {
        return response.status(503).json({ message: "Profile updated, but the verification email could not be sent. Check SMTP settings and retry verification.", error: true, success: false });
      }
    }
    return response.json({
      message: "User Updated successfully",
      error: false,
      success: true,
      user: {
        name: updateUser?.name,
        email: updateUser?.email,
        _id: updateUser?._id,
        mobile: updateUser?.mobile,
        avatar: updateUser?.avatar,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//Forgot password
export async function forgotPasswordController(request, response) {
  try {
    const { email } = request.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return response.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    } else {
      const verifyCode = String(Math.floor(100000 + Math.random() * 900000));
      user.otp = verifyCode;
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      user.passwordResetVerifiedAt = null;
      await user.save();

      const emailSent = await sendEmailFun(
        email,
        "Reset your Webzoneo password",
        "Your password reset code is " + verifyCode + ". It expires in 10 minutes. If you did not request this, ignore this email.",
        "<p>Your password reset code is <strong>" + verifyCode + "</strong>.</p><p>It expires in 10 minutes. If you did not request this, ignore this email.</p>"
      );
      if (!emailSent) {
        user.otp = null;
        user.otpExpires = null;
        await user.save();
        return response.status(503).json({ message: "Password reset email could not be sent. Please contact the administrator.", error: true, success: false });
      }

      return response.json({ message: "Check your email for the reset code.", error: false, success: true });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//Verify forgot password otp
export async function verifyForgotPasswordOtp(request, response) {
  try {
    const { email, otp } = request.body;
    if (typeof email !== "string" || typeof otp !== "string" || !email.trim() || !/^\d{6}$/.test(otp)) {
      return response.status(400).json({ message: "Provide a valid email and six-digit OTP.", error: true, success: false });
    }
    const user = await UserModel.findOne({ email: email.trim().toLowerCase() })
      .select("+otp +otpExpires +passwordResetVerifiedAt");
    if (!user || !user.otp || !user.otpExpires) {
      return response.status(400).json({ message: "Invalid or expired OTP.", error: true, success: false });
    }
    if (otp !== user.otp) {
      return response.status(400).json({ message: "Invalid OTP", error: true, success: false });
    }
    if (new Date(user.otpExpires).getTime() <= Date.now()) {
      user.otp = null;
      user.otpExpires = null;
      user.passwordResetVerifiedAt = null;
      await user.save();
      return response.status(400).json({ message: "OTP is expired", error: true, success: false });
    }
    user.otp = null;
    user.otpExpires = null;
    user.passwordResetVerifiedAt = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    return response.status(200).json({
      message: "Verify OTP successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//Reset Password
export async function resetPassword(request, response) {
  try {
    // add ,oldPassword in below const but at this time it gives error
    const { email, newPassword, confirmPassword, oldPassword } = request.body;
    if (!email || !newPassword || !confirmPassword) {
      return response.status(400).json({
        message: "Provide required fields email, newPassword, confirmPassword",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findById(request.userId).select("+password");
    if (!user || typeof email !== "string" || user.email?.toLowerCase() !== email.trim().toLowerCase()) {
      return response.status(403).json({ message: "You can only change the password for your own account.", error: true, success: false });
    }
    if (typeof oldPassword !== "string" || !oldPassword) {
      return response.status(400).json({ message: "Current password is required.", error: true, success: false });
    }
    const checkPassword = await bcryptjs.compare(oldPassword, user.password);
    if (!checkPassword) {
      return response.status(400).json({ message: "Your old password is wrong", error: true, success: false });
    }
    if (typeof newPassword !== "string" || newPassword.length < 10) {
      return response.status(400).json({ message: "New password must be at least 10 characters.", error: true, success: false });
    }

    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        message: "newPassword and confirmPassword must be same",
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(confirmPassword, salt);

    user.password = hashPassword;
    user.signUpWithGoogle = false;
    await user.save();

    return response.json({
      message: "Password update successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//refresh token controler
export async function refreshToken(request, response) {
  try {
    const refreshToken =
      request.cookies.refreshToken ||
      request?.headers?.authorization?.split(" ")[1]; /// [Bearer token]

    if (!refreshToken) {
      return response.status(401).json({
        message: "Invalid token",
        error: true,
        success: false,
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );
    if (!verifyToken) {
      return response.status(401).json({
        message: "Token is expired",
        error: true,
        success: false,
      });
    }
    const userId = verifyToken?._id;
    const newAccessToken = await generatedAccessToken(userId);

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.cookie("accessToken", newAccessToken, cookiesOption);

    return response.json({
      message: "New Access token generated",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// New controller for setting new password without old password
export async function setNewPasswordController(request, response) {
  try {
    const { email, newPassword, confirmPassword } = request.body;

    if (!email || !newPassword || !confirmPassword) {
      return response.status(400).json({
        message: "Provide required fields email, newPassword, confirmPassword",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return response.status(400).json({
        message: "newPassword and confirmPassword must be the same",
        error: true,
        success: false,
      });
    }

    if (typeof email !== "string" || typeof newPassword !== "string" || newPassword.length < 10) {
      return response.status(400).json({ message: "Provide a valid email and a password of at least 10 characters.", error: true, success: false });
    }
    const user = await UserModel.findOne({ email: email.trim().toLowerCase() }).select("+passwordResetVerifiedAt");
    if (!user || !user.passwordResetVerifiedAt || new Date(user.passwordResetVerifiedAt).getTime() <= Date.now()) {
      return response.status(403).json({ message: "Verify a current password-reset OTP before changing the password.", error: true, success: false });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);
    user.password = hashPassword;
    user.signUpWithGoogle = false;
    user.passwordResetVerifiedAt = null;
    await user.save();

    return response.json({
      message: "Password updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get login user details
export async function userDetails(request, response) {
  try {
    const userId = request.userId;

    const user = await UserModel.findById(userId)
      .select("-password -refresh_token")
      .populate("address_details");

    return response.status(200).json({
      message: "User details",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Something is wrong",
      error: true,
      success: false,
    });
  }
}

//get all login user details
export async function getAllUsers(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await UserModel.countDocuments();
    const users = await UserModel.find().select('-password -refresh_token -access_token -otp -otpExpires -passwordResetVerifiedAt').skip(skip).limit(limit);

    if (!users) {
      return response.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "User details",
      error: false,
      success: true,
      data: users,
      total: totalUsers,
      page: page,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    return response.status(500).json({
      message: "Something is wrong",
      error: true,
      success: false,
    });
  }
}

export async function getAllUsersNoPagination(request, response) {
  try {
    const users = await UserModel.find().select('-password -refresh_token -access_token -otp -otpExpires -passwordResetVerifiedAt');

    if (!users) {
      return response.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "All users fetched successfully",
      error: false,
      success: true,
      data: users,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Something went wrong",
      error: true,
      success: false,
    });
  }
}

export async function deleteMultipleUsers(request, response) {
  const { ids } = request.body;

  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return response.status(400).json({
      message: "Invalid request",
      error: true,
      success: false,
    });
  }
  // for(let i = 0; i < ids.length; i++){
  //   const user = await UserModel.findById(ids[i]);
  //   const images = user.images;
  //    img = "";
  //    for(img of images){
  //      const imgUrl = img;
  //      const urlArr = imgUrl.split("/");
  //      const image = urlArr[urlArr.length - 1];
  //      const imageName = image.split(".")[0];

  //    }

  // }
  try {
    await UserModel.deleteMany({ _id: { $in: ids } });
    return response.status(200).json({
      message: "User deleted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Something is wrong",
      error: true,
      success: false,
    });
  }
}

// Get pending admin requests
export async function getPendingAdminRequests(request, response) {
  try {
    const pendingAdmins = await UserModel.find({ pendingAdmin: true });

    if (!pendingAdmins || pendingAdmins.length === 0) {
      return response.status(404).json({
        message: "No pending admin requests found",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "Pending admin requests fetched successfully",
      error: false,
      success: true,
      data: pendingAdmins,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Approve admin request
export async function approveAdminRequest(request, response) {
  try {
    const userId = request.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return response.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    // Generate new OTP and set expiry
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = verifyCode;
    user.otpExpires = Date.now() + 600000; // 10 minutes expiry

    user.adminAccess = true;
    user.pendingAdmin = false;

    await user.save();

    // Send a verification code using the configured mail transport.
    const emailSent = await sendEmailFun(
      user.email,
      "Webzoneo administrator access approved",
      "Your administrator access was approved. Your verification code is " + verifyCode + ". It expires in 10 minutes.",
      "<p>Your administrator access was approved.</p><p>Your verification code is <strong>" + verifyCode + "</strong>. It expires in 10 minutes.</p>"
    );
    if (!emailSent) {
      return response.status(503).json({ message: "Admin access was updated, but the verification email could not be sent. Check SMTP settings.", error: true, success: false });
    }

    return response.status(200).json({
      message: "Admin request approved successfully and OTP sent",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Reject admin request
export async function rejectAdminRequest(request, response) {
  try {
    const userId = request.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return response.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    user.pendingAdmin = false;
    await user.save();

    return response.status(200).json({
      message: "Admin request rejected successfully",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Update admin access
export async function updateAdminAccess(request, response) {
  try {
    const userId = request.params.id;
    const { adminAccess } = request.body;

    if (typeof adminAccess !== "boolean") {
      return response.status(400).json({
        message: "adminAccess must be a boolean",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return response.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    user.adminAccess = adminAccess;
    await user.save();

    return response.status(200).json({
      message: "Admin access updated successfully",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
