import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bookSlot, getSlots, locationBooking } from '../API/apiCalls';
import {useNavigate} from 'react-router-dom'
function Model(props) {
    const dispatch = useDispatch()
    const [total,setTotal]=useState()
    const navigate=useNavigate()
    const Checkout = (e) => {
        e.preventDefault()
        bookSlot({ location: props.location, date: props.date, fromTime: props.fromTime, toTime: props.toTime, vehicle: props.vehicle, userId: props.id, bookings: props.bookings })
        locationBooking({ bookings: { slots: props.bookings, date: props.date, fromTime: props.fromTime, toTime: props.toTime }, location: props.location })
        setTimeout(() => {
            sessionStorage.clear()
        }, 1000);
        let beforeTime = new Date(new Date().toDateString() + ' ' + props.fromTime).getTime()
        let nextTime = new Date(new Date().toDateString() + ' ' + props.toTime).getTime()
        let totalValue
        if(props.vehicle=="4 wheeler"){
            let time=(nextTime-beforeTime)/60000;
            totalValue=100+(time/30)*10;
        }
        else{
            let time=(nextTime-beforeTime)/60000;
            totalValue=50+(time/30)*10;
        }
        alert(totalValue)
        navigate('/dashboard')

    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>

                <div class="forms " >
                    <form className='form cardpay'>
                        <h3><i class="material-icons">lock</i> New Payment Method</h3>
                        <h4><i class="material-icons">credit_card</i> Enter Payment Information</h4>
                        <div id="cc">
                            <label className='label'>Card Number <span class="pull-right card-type"></span></label>
                            <input class="form-control input" type="number" placeholder="1111 2222 3333 4444" name="creditcard" />
                        </div>
                        <div class="flexrow">
                            <div id="date">
                                <label className='label'>Expiration Date</label>
                                <div class="flexrow flow-left">
                                    <input className='input form-control' style={{ width: "40%" }} name="date" placeholder='mm/yy'
                                    />
                                </div>
                            </div>
                            <div id="csv">
                                <label className='label'>CVC</label>
                                <div class="flexrow flow-right">
                                    <input type="text" class="form-control input" maxlength="3" name="cvc" autocomplete="no" placeholder="XXX" pattern="[0-9]{3}" title="Three letter country code" />
                                </div>
                            </div>
                        </div>
                        <div class="flexrow flow-right buttonrow">
                            <span className='mx-1 fw-bold h3'></span><button class="confirm button" onClick={Checkout}>Checkout</button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default Model