const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const multer = require('multer')
const jwtSecret = "asd889asdas5656asdas887";
const bookingSchema = require('../models/bookingSchema');
const bookingModel = mongoose.model("slotBooking", bookingSchema)

const getHistory = (req, res) => {
    bookingModel.findOne({ userId: req.body.id }, (err, data) => {
        if (err) {
            console.log("err")
        } 
        else if(data==null){
            console.log("null")
            res.send("null")
        }
        else{
            res.send(data)
        }
    })
}
const getMonths = (req, res) => {
    let arr = []
    bookingModel.findOne({ userId: req.body.id }, (err, data) => {
        if (err) {
            console.log("err")
        } else if(data!=null){
            for (let i = 0; i < data.bookings.length; i++) {
                let month = new Date(data.date[i]).getMonth()
                if (month == req.body.month) {
                    arr.push({ location: data.location[i], fromTime: data.fromTime[i], toTime: data.toTime[i], date: data.date[i], vehicle: data.vehicle[i], bookings: data.bookings[i] })
                }
            }
            res.send(arr)
        }
    })
}

const getDates = (req, res) => {
    let arr = []
    bookingModel.findOne({ userId: req.body.id }, (err, data) => {
        if (err) {
            console.log("err")
        } else {
            for (let i = 0; i < data.bookings.length; i++) {
                let dbDate = new Date(data.date[i]);
                let userDate = new Date(req.body.date);
                let dbsDate = new Date(dbDate.getFullYear(), dbDate.getMonth(), dbDate.getDate())
                let usersDate = new Date(userDate.getFullYear(), userDate.getMonth(), userDate.getDate())
                if (dbsDate == usersDate) {
                    arr.push({ location: data.location[i], fromTime: data.fromTime[i], toTime: data.toTime[i], date: data.date[i], vehicle: data.vehicle[i], bookings: data.bookings[i] })
                }
            }
            res.send(arr)
        }
    })
}

module.exports = {
    getHistory: getHistory,
    getMonths: getMonths,
    getDates: getDates
}