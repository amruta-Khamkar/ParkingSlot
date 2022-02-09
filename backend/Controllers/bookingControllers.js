const mongoose = require('mongoose');
const bookingSchema = require('../models/bookingSchema');
const locationSchema = require('../models/locationSchema');
const bookingModel = mongoose.model("slotBooking", bookingSchema)
const locationModel = mongoose.model("locationBooking", locationSchema)

const bookSlot = (req, res) => {
    console.log("hie")
    let bookings = new bookingModel(req.body)
    bookings.save((err) => {
        if (err) {
            bookingModel.findOneAndUpdate({ userId: req.body.userId }, { $push: { location: req.body.location, vehicle: req.body.vehicle, fromTime: req.body.fromTime, toTime: req.body.toTime, date: req.body.date, bookings: req.body.bookings } }, (err, data) => {
                if (err) {
                    console.log("err")
                } else {
                    // console.log("data")
                }
            })
        }
    })
}

const locationBooking = (req, res) => {
    locationModel.findOneAndUpdate({ locationName: req.body.location }, { $push: { bookedSlots: req.body.bookings } }, (err, data) => {
        if (err) {
            console.log("err")
        } else {
            // console.log("data")
        }
    })
}

const getSlots = (req, res) => {

    locationModel.find({}, (err, data) => {
        if (err) throw err;
        res.send(data)
    })
}

const getBookingData = (req, res) => {
//     locationModel.findOne({ _id: req.body.id } ,(err, data) => {
//         if (err) {
//             console.log("err")
//         } else {
//             // console.log(data)
//             for(let i=0;i<data.bookedSlots.length;i++){
//                 let todayDate=new Date(new Date().getTime())
//                 let nextTime=new Date(new Date().toDateString() + ' ' + data.bookedSlots[i].toTime).getTime()
//                 if(nextTime-beforeTime==0){
//                     console.log(beforeTime,nextTime)
//                     locationModel.updateMany({_id:req.body.id},{$pull:{bookedSlots:data.bookedSlots[i]}},function (err, data) {
//                         if (err){
//                             console.log(err)
//                         }
//                         else{
//                             console.log("Updated Docs : ", data);
//                         }
//                     // console.log(data)
//                 })
//             }
//         }
//     }
// })
}
module.exports = {
    bookSlot: bookSlot,
    locationBooking: locationBooking,
    getSlots: getSlots,
    getBookingData: getBookingData
}