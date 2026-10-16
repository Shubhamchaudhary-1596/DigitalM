import {Router} from 'express'
import {authWithGoogle, deleteMultipleUsers, forgotPasswordController, getAllUsers, loginUserController, logoutController, refreshToken, registerUserController, removeImageFromCloudinary, resetPassword, updateUserDetails, userAvatarController, userDetails, verifyEmailController, verifyForgotPasswordOtp, adminRegisterUserController, getPendingAdminRequests, approveAdminRequest, rejectAdminRequest, updateAdminAccess, setNewPasswordController, getAllUsersNoPagination} from '../controllers/user.controller.js'
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const userRouter = Router()
userRouter.post('/register', registerUserController)
userRouter.post('/admin-register',  adminRegisterUserController)
userRouter.get('/pending-admins', auth, getPendingAdminRequests)
userRouter.post('/approve-admin/:id', auth, approveAdminRequest)
userRouter.post('/reject-admin/:id', auth, rejectAdminRequest)
userRouter.put('/update-admin-access/:id', auth, updateAdminAccess)
userRouter.post('/verifyEmail', verifyEmailController)
userRouter.post('/login', loginUserController)
userRouter.post('/authWithGoogle', authWithGoogle)
userRouter.get('/logout', auth, logoutController)
userRouter.put('/user-avatar' , auth, upload.array('avatar') , userAvatarController)
userRouter.delete('/deleteImage' , auth, removeImageFromCloudinary)
userRouter.delete('/deleteMultipleUsers' , auth, deleteMultipleUsers)
userRouter.put('/:id' , auth, updateUserDetails)
userRouter.post('/forgot-password' , forgotPasswordController)
userRouter.post('/verify-forgot-password-otp' , verifyForgotPasswordOtp)
userRouter.post('/reset-password' , resetPassword)
userRouter.post('/set-new-password', setNewPasswordController)
userRouter.post('/refresh-token' , refreshToken)
userRouter.get('/user-details' , auth,userDetails)
userRouter.get('/getAllUsers' , getAllUsers)
userRouter.get('/getAllUsersNoPagination', getAllUsersNoPagination)

export default userRouter
