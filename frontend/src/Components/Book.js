import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import sweet from 'sweetalert2';
import Slots from './Slots'
import Navbars from './Navbars';
import '../CSS/login.css'
import '../CSS/booking.css'
import { useDispatch, useSelector } from 'react-redux';
import { getBookingData, getSlots } from '../API/apiCalls';
import Footer from './Footer';
const regForName = RegExp(/^[a-zA-Z0-9\s,.'-]{3,}$/);
function Book() {
    const [bookingData, setBookingData] = useState({
        location: '',
        date: '',
        fromTime: '',
        toTime: '',
        vehicle: ''
    })
    const [errors, setErrors] = useState({
        date: ' ',
        fromTime: ' ',
        toTime: ' ',
    })
    const [slotData, setSlotData] = useState()
    const color = useSelector((state) => state.changeColor);
    console.log(color)

    useEffect(() => {
        sessionStorage.setItem("slots", JSON.stringify(color))
        setSlotData(color)
    }, [color]);

    const [flag, setFlag] = useState(0)
    console.log(errors)
    const dispatch = useDispatch()
    const bookData = (event) => {

        const { name, value } = event.target
        switch (name) {
            case "date":
                var myDate = new Date(value);
                let today = new Date();
                if (myDate.getDate() < today.getDate()) {
                    errors.date = "Date should not be in past"
                    break;
                }
                else if (myDate.getFullYear() > today.getFullYear()) {
                    errors.date = "year should be current";
                    break;
                }
                // else if(myDate.getDate()>today.getDate()+3){
                //     errors.date="you can book a slot upto 3 days"
                // }
                else {
                    errors.date = ''
                    break;
                }

            case "fromTime":
                console.log(bookingData.toTime)
                let currentTime = new Date();
                let timer = new Date(bookingData.date)
                let nextTime = new Date(new Date().toDateString() + ' ' + bookingData.toTime)
                let bTime = new Date(new Date().toDateString() + ' ' + value)
                console.log(bookingData.toTime)

                console.log(value)
                console.log(bTime.getHours(), nextTime.getHours())
                if (timer.getDate() > currentTime.getDate()) {
                    errors.fromTime = ''
                    break;
                }
                else if (bTime.getTime() == nextTime.getTime()) {
                    errors.fromTime = "time cant be same";
                    errors.toTime = '';
                    break;
                }
                else if (bTime.getHours() <= currentTime.getHours()) {
                    errors.fromTime = "Please select proper time"
                    break;
                }
                else if (bookingData.toTime != '') {
                    console.log(nextTime.getHours(), bTime.getHours())
                    if (nextTime.getHours() < bTime.getHours()) {
                        errors.fromTime = 'please select time which is before to Time ';
                        errors.toTime = ''
                        break;
                    }
                    else if (bTime.getTime() != nextTime.getTime()) {
                        console.log(nextTime.getMinutes())
                        errors.fromTime = "";
                        errors.toTime = ''
                        break;
                    }
                    else {
                        errors.fromTime = ''
                        break;
                    }
                }



                else {
                    errors.fromTime = ''
                    break;
                }


            case "toTime":
                console.log(value)
                let myTime = new Date(new Date().toDateString() + ' ' + value)
                let beforeTime = new Date(new Date().toDateString() + ' ' + bookingData.toTime)
                let timess = new Date(new Date().toDateString() + ' ' + bookingData.fromTime)
                console.log(myTime.getMinutes())

                if (timess.getHours() == myTime.getHours()) {
                    if (myTime.getMinutes() == 0) {
                        errors.toTime = "time cant be same";
                        errors.fromTime = ''
                        break;
                    }
                    else if (myTime.getMinutes() == 30) {
                        errors.toTime = "";
                        break;
                    }
                    else if (myTime.getMinutes() > 0) {
                        errors.fromTime = ''
                        errors.toTime = "Minutes should be round figu#FF3131 e.g 1:30 or 1:00";
                        break;
                    }
                    else if (myTime.getTime() != beforeTime.getTime()) {
                        console.log(nextTime.getMinutes())
                        errors.toTime = "";
                    }
                    else {
                        errors.toTime = "Minutes should be round figu#FF3131 e.g 1:30 or 1:00"
                        break;
                    }
                }

                else if (timess.getHours() > myTime.getHours()) {
                    errors.toTime = 'Select time after from time'
                    errors.fromTime = ''
                    break;
                }
                else if (myTime.getMinutes() != 30 && myTime.getMinutes() != 0) {
                    errors.toTime = "Minutes should be round figu#FF3131 e.g 1:30 or 1:00"
                    break;
                }
                else if (beforeTime.getHours() < timess.getHours()) {
                    errors.fromTime = ''
                    errors.toTime = ''
                    break;
                }
                else {
                    errors.toTime = ''
                    break;
                }
        }
        setErrors({ ...errors, date: errors.date, fromTime: errors.fromTime, toTime: errors.toTime })
        setBookingData({ ...bookingData, [name]: value })
        console.log(bookingData)
    }
    const showSlots = () => {
        let arr = []
        let count=0;
        let countDate=0;
        if (errors.date == '' && errors.fromTime == '' && errors.toTime == '' && bookingData.location != '' && bookingData.vehicle != '') {
            setFlag(1)
           
            getSlots().then((res) => {
                if (sessionStorage.getItem("slots")) {
                    let slots = JSON.parse(sessionStorage.getItem("slots"))
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].locationName == bookingData.location) {
                            for (let j = 0; j < res.data[i].bookedSlots.length; j++) {
                                let dbDate = new Date(res.data[i].bookedSlots[j].date);
                                let myDate = new Date(bookingData.date);
                                let dbsDate = new Date(dbDate.getFullYear(), dbDate.getMonth(), dbDate.getDate())
                                let todaysDate = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate())
                                console.log(dbsDate==todaysDate)
                                if (dbsDate.getDate() == todaysDate.getDate() && dbsDate.getMonth() == todaysDate.getMonth() && dbsDate.getFullYear() == todaysDate.getFullYear()) {
                                    countDate++;
                                    console.log("date same")
                                    let dbTime = new Date(new Date().toDateString() + ' ' + res.data[i].bookedSlots[j].fromTime).getHours()
                                    let myTime = new Date(new Date().toDateString() + ' ' + bookingData.fromTime).getHours()
                                    if (dbTime == myTime) {
                                        console.log("yes")
                                        arr.push(res.data[i].bookedSlots[j].slots)
                                        console.log(arr)
                                        slots.forEach(function (arrayItem, index) {
                                            if (arr.includes(index+1)) {
                                                slots[index].color = "#FF3131";
                                            }
                                            else{
                                                slots[index].color="#22DD22"
                                            }
                                        })
                                        count++;
                                        console.log("count",count)
                                    }
                                    else if(count==0){
                                        console.log("no")
                                        slots.forEach(function (arrayItem, index) {
                                            slots[index].color = "#22DD22"
                                        })
                                    }
                                }
                                else if(countDate==0){
                                    slots.forEach(function (arrayItem, index) {
                                        slots[index].color = "#22DD22"
                                    })
                                }

                            }
                        }
                    }
                    console.log(slots)
                    setSlotData(slots)
                    sessionStorage.setItem("slots", JSON.stringify(slots))
                }
            })
        }

        else {
            sweet.fire({
                title: 'Fill All fields Properly',
                icon: "warning",
                timer: 2000
            })
            setFlag(0)
        }
        let t = new Date(new Date().toDateString() + ' ' + bookingData.fromTime).getTime()
        let c = new Date(new Date().toDateString() + ' ' + bookingData.toTime).getTime()

    }
    return <div>
        <Navbars />
        <Container>
            <Form className='loginForm mt-2 bookingForm'>
                <fieldset id="disable">
                    <h1 className='text-center'>Book a Slot</h1>
                    <Form.Group className="mb-2" >
                        <Form.Label className='text-dark mt-2 label1' >Location Name</Form.Label>
                        <Form.Select aria-label="Default select example" name="location" onChange={bookData}>
                            <option value=''>Select Location</option>
                            <option value="Airoli">Airoli</option>
                            <option value="Rabale">Rabale</option>
                            <option value="Ghansoli">Ghansoli</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='text-dark mt-2 label1' >Vehicle Type:</Form.Label>
                        <Form.Select aria-label="Default select example" name="vehicle" onChange={bookData}>
                            <option value=''>select Vehicle</option>
                            <option value="4 wheeler">4 wheeler</option>
                            <option value="2 wheeler">2 wheeler</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-2" >
                        <Form.Label className='text-dark mt-2 label1'>Booking Date:</Form.Label>
                        <Form.Control type="date" name="date" onChange={bookData} />
                    </Form.Group>
                    {errors.date.length > 0 &&
                        <span style={{ color: "#FF3131" }}>{errors.date}</span>}
                    <Form.Group className="mb-2" >
                        <Form.Label className='text-dark mt-2 label1'>From Time:</Form.Label>
                        <Form.Select aria-label="Default select example" name="fromTime" onChange={bookData}>
                            <option >From Time</option>
                            <option value="1:00">1:00</option>
                            <option value="2:00">2:00</option>
                            <option value="3:00">3:00</option>
                            <option value="4:00">4:00</option>
                            <option value="6:00">6:00</option>
                            <option value="7:00">7:00</option>
                            <option value="8:00">8:00</option>
                            <option value="9:00">9:00</option>
                            <option value="10:00">10:00</option>
                            <option value="11:00">11:00</option>
                            <option value="12:00">12:00</option>
                            <option value="13:00">13:00</option>
                            <option value="14:00">14:00</option>
                            <option value="15:00">15:00</option>
                            <option value="16:00">16:00</option>
                            <option value="17:00">17:00</option>
                            <option value="18:00">18:00</option>
                            <option value="19:00">19:00</option>
                            <option value="20:00">20:00</option>
                            <option value="21:00">21:00</option>
                            <option value="22:00">22:00</option>
                            <option value="22:00">23:00</option>
                        </Form.Select>
                    </Form.Group>
                    {errors.fromTime.length > 0 &&
                        <span style={{ color: "#FF3131" }}>{errors.fromTime}</span>}
                    <Form.Group  >
                        <Form.Label className='text-dark mt-2 label1'>To Time:</Form.Label>
                        <Form.Control type="time" name="toTime" onChange={bookData} />
                    </Form.Group>
                    {errors.toTime.length > 0 &&
                        <span style={{ color: "#FF3131" }}>{errors.toTime}</span>}
                </fieldset>
                <Button className='my-3' onClick={showSlots}>Show slots</Button>
            </Form>
            {flag == 1 && <Slots location={bookingData.location} date={bookingData.date} fromTime={bookingData.fromTime} vehicle={bookingData.vehicle} toTime={bookingData.toTime} slotData={slotData} />}
            {/* <Slots/> */}
        </Container>
        <Footer/>
    </div>;
}

export default Book;
