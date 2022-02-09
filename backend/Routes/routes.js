const express = require('express');
const router = express.Router();
const connectDb=require('../Database/connectDb')
const upload=require('../multer/upload')
const autenticateToken=require('../Authentication/auth')

const userController=require('../Controllers/userConterollers')
const bookingController=require('../Controllers/bookingControllers')
const historyController=require('../Controllers/historyControllers')
connectDb()


router.post('/adduser', upload.single('photo'),userController.addUser)
router.post('/loginuser',userController.loginUser)
router.post('/bookslot',autenticateToken,bookingController.bookSlot)
router.post('/locationslot',autenticateToken,bookingController.locationBooking)
router.post('/getbookingdata',autenticateToken,bookingController.getBookingData)
router.get('/getslots',autenticateToken,bookingController.getSlots)
router.post('/gethistory',autenticateToken,historyController.getHistory)
router.post('/getmonths',autenticateToken,historyController.getMonths)
router.post('/getdates',autenticateToken,historyController.getDates)

module.exports=router

