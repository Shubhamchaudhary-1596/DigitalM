import {Router} from 'express'
import rateLimit from 'express-rate-limit';
import {authWithGoogle, deleteMultipleUsers, forgotPasswordController, getAllUsers, loginUserController, logoutController, refreshToken, registerUserController, removeImageFromCloudinary, resetPassword, updateUserDetails, userAvatarController, userDetails, verifyEmailController, verifyForgotPasswordOtp, adminRegisterUserController, getPendingAdminRequests, approveAdminRequest, rejectAdminRequest, updateAdminAccess, setNewPasswordController, getAllUsersNoPagination} from '../controllers/user.controller.js'
import auth, { adminOnly } from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const userRouter = Router()
const authAttemptLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: true, legacyHeaders: false });
userRouter.post('/register', registerUserController)
userRouter.post('/admin-register',  adminRegisterUserController)
userRouter.get('/pending-admins', auth, adminOnly, getPendingAdminRequests)
userRouter.post('/approve-admin/:id', auth, adminOnly, approveAdminRequest)
userRouter.post('/reject-admin/:id', auth, adminOnly, rejectAdminRequest)
userRouter.put('/update-admin-access/:id', auth, adminOnly, updateAdminAccess)
userRouter.post('/verifyEmail', verifyEmailController)
userRouter.post('/login', authAttemptLimiter, loginUserController)
userRouter.post('/authWithGoogle', authWithGoogle)
userRouter.get('/logout', auth, logoutController)
userRouter.put('/user-avatar' , auth, upload.array('avatar') , userAvatarController)
userRouter.delete('/deleteImage' , auth, adminOnly, removeImageFromCloudinary)
userRouter.delete('/deleteMultipleUsers' , auth, adminOnly, deleteMultipleUsers)
userRouter.put('/:id' , auth, updateUserDetails)
userRouter.post('/forgot-password' , authAttemptLimiter, forgotPasswordController)
userRouter.post('/verify-forgot-password-otp' , authAttemptLimiter, verifyForgotPasswordOtp)
userRouter.post('/reset-password' , auth, resetPassword)
userRouter.post('/set-new-password', authAttemptLimiter, setNewPasswordController)
userRouter.post('/refresh-token' , refreshToken)
userRouter.get('/user-details' , auth,userDetails)
userRouter.get('/getAllUsers' , auth, adminOnly, getAllUsers)
userRouter.get('/getAllUsersNoPagination', auth, adminOnly, getAllUsersNoPagination)

export default userRouter
