import { useState, useEffect } from "react";
import { Button, Col, Modal, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bookSlot, getSlots, locationBooking } from '../API/apiCalls';
import { useLocation, useNavigate } from 'react-router-dom';
import sweet from 'sweetalert2';
import Navbars from "./Navbars";
import '../CSS/payment.css'
import Footer from "./Footer";
let nameReg = /^[a-zA-Z][a-zA-Z ]*$/;
let cardReg = /"^4[0-9]{12}(?:[0-9]{3})?$"/
function Payment() {
    const [data, setData] = useState()
    const [total, setTotal] = useState()
    const [fare, setFare] = useState()
    const [time1, setTime1] = useState()
    const [time2, setTime2] = useState()
    const [errors, setErrors] = useState({
        cardNumber: ' ',
        cardName: ' ',
        cvv: ' ',
    })
    const location = useLocation()
    const navigate = useNavigate()
    console.log(location)
    useEffect(() => {
        if(location.state!=undefined){
        setData(location.state)
        let beforeTime = new Date(new Date().toDateString() + ' ' + location.state.fromTime).getTime()
        let nextTime = new Date(new Date().toDateString() + ' ' + location.state.toTime).getTime()
        setTime1(beforeTime / 60000)
        setTime2(nextTime / 60000)
        let totalValue
        if (location.state.vehicle == "4 wheeler") {
            let time = (nextTime - beforeTime) / 60000;
            totalValue = 100 + (time / 30) * 10;
            setTotal(totalValue)
            setFare(100)
        }
        else {
            let time = (nextTime - beforeTime) / 60000;
            totalValue = 50 + (time / 30) * 10;
            setTotal(totalValue)

            setFare(50)
        }
    }
    }, []);
    const handler = (event) => {
        const { name, value } = event.target

        switch (name) {
            case "cardName":
                errors.cardName = nameReg.test(value) ? '' : 'enter just only your name dont enter numbers';
                break;

            case "cardNumber":
                errors.cardNumber = value.length == 16 ? '' : "'enter 16 digits card number";
                break;

            case "cvv":
                errors.cvv = value.length == 3 ? '' : "enter three numbers";
                break;
        }

        console.log(errors)
        setErrors({ ...errors })
    }
    const Checkout = (e) => {
        e.preventDefault()
        if (errors.cardName == '' && errors.cardNumber == '' && errors.cvv == '') {
            bookSlot({ location: data.location, date: data.date, fromTime: data.fromTime, toTime: data.toTime, vehicle: data.vehicle, userId: data.id, bookings: data.bookings })
            locationBooking({ bookings: { slots: data.bookings, date: data.date, fromTime: data.fromTime, toTime: data.toTime }, location: data.location })
            setTimeout(() => {
                sessionStorage.clear()
            }, 1000);
            sweet.fire({
                title: "Payment Successfull",
                text: "Thank your booking slot here!",
                icon: "success",
                timer: 2000
            })
            navigate('/dashboard')
        }
        else {
            sweet.fire({
                title: "Fill all fields Properly",
                icon: "warning",
                timer: 1000
            })
        }
    }
    return (<>
        <Navbars />
        <Row style={{ width: "100%" }}>
            <h1>Payment</h1>
            <Col >
                <label for="cname">Name on Card</label>
                <input type="text" className="inputs" id="cname" name="cardName" onChange={handler} placeholder="John More Doe" />
                <span style={{ color: "red" }}>{errors.cardName}</span><br />
                <label for="ccnum">Credit card number</label>
                <input type="number" className="inputs" id="ccnum" name="cardNumber" onChange={handler} placeholder="1111-2222-3333-4444" />
                <span style={{ color: "red" }}>{errors.cardNumber}</span><br />
                <label for="cname">Expiry Month</label>
                <Form.Select aria-label="Default select example" className="mb-2">
                    <option selected value='1'>Janaury</option>
                    <option value='2'>February</option>
                    <option value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                </Form.Select>

                <div class="row">
                    <div className="col-50 mt-2">
                        <label for="cname">Expiry Year</label>
                        <Form.Select aria-label="Default select example">
                            <option value='22'>2022</option>
                            <option value='23'>2023</option>
                            <option value='24'>2024</option>
                            <option value='25'>2025</option>
                            <option value='26'>2026</option>
                        </Form.Select>
                    </div>
                    <div class="col-50">
                        <label for="cvv">CVV</label>
                        <input type="number" className="inputs" id="cvv" name="cvv" onChange={handler} placeholder="352" />
                        <span style={{ color: "red" }}>{errors.cvv}</span><br />
                    </div>
                </div>
            </Col>
            <Col>
                <div>
                    {
                        location.state != undefined &&
                        <div class="container">
                            <h4 className="mb-3">Billing Details
                            </h4>
                            <p>Vehicle Type<span class="price">{location.state.vehicle}</span></p>
                            <p>Slot Number<span class="price">Slot {location.state.bookings}</span></p>
                            <p>Base Fare <span class="price">Rs.{fare}</span></p>
                            <p>Total Hrs<span class="price">{(time2 - time1) / 60} hrs</span></p>
                            <p>Per 30 mints charge <span class="price">Rs.10</span></p>
                            <hr />
                            <p>Total <span class="price"><strong>Rs.{total}</strong></span></p>
                        </div>
                    }
                </div>
            </Col>
            <Button variant="success" className="fw-bold mb-3" onClick={Checkout}>Pay Now</Button>
        </Row>
        <Footer/>
    </>
    )
}

export default Payment;
