import React, { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { Navigate, useNavigate,Link } from 'react-router-dom';
import sweet from 'sweetalert2';
import {addUser,bookSlot} from '../API/apiCalls'
import '../CSS/register.css'
const regForName = RegExp(/^[A-Za-z]{3,10}$/);
const regForUName = RegExp(/^[A-Za-z]{2,12}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);
const RegForMobile = RegExp('^((\\+91-?)|0)?[0-9]{10}$')
function Register() {
    // showHide Password 
    const [data, setData] = useState({
        firstName:'',
        lastName:'',
        emailAdd:'',
        password:'',
        confirmPass:'',
        photo:''
    });
    const [eye, seteye] = useState(true);
    const [eyes, seteyes] = useState(true);
    const [password, setpassword] = useState("password");
    const [passwords, setpasswords] = useState("password");
    const [select, setSelect] = useState();
    const [state, setState] = useState({
        flag: 0
    })
    const [Errors, SetError] = useState({
        firstName: '',
        lastName: '',
        emailAdd: '',
        password: '',
        phoneNum: '',
        confirmPass: ''
    })
    const navigate=useNavigate()
    const Eye = () => {
        if (password == "password") {
            setpassword("text");
            seteye(false);
        }
        else {
            setpassword("password");
            seteye(true);
        }
    }
    const Eyes = () => {
        if (passwords == "password") {
            setpasswords("text");
            seteyes(false);
        }
        else {
            setpasswords("password");
            seteyes(true);
        }
    }
       
    const handleRegisterData = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'firstName':
                Errors.firstName = regForName.test(value) ? '' : ' name should be between 2 to 10 letters';
                break;
            case 'lastName':
                Errors.lastName = regForName.test(value) ? '' : ' last name should be between 2 to 10 letters';
                break;
            case 'emailAdd':
                Errors.emailAdd = regForEmail.test(value) ? '' : 'Enter proper email';
                break;

            case 'password':
                Errors.password = regForPass.test(value) ? '' : 'Password must be between 6 to 16 characters and must contain one number and one special character';
                break;

            case 'confirmPass':
                Errors.confirmPass=data.password==value?'':'password and confirm password should match'
            
        }
        setSelect({ Errors, [name]: value }, () => {
            console.log(Errors)
        })

        setData({ ...data, [name]: value })
        console.log(data)
    }
    const handlePhoto = (e) => {
        console.log({ photo: e.target.files[0] })
        setData({ ...data, photo: e.target.files[0] });
     
    }
    const submitRegisterData = () => {
        console.log(data.photo)
        if(data.firstName==''|| data.lastName==''||data.emailAdd==''||data.password==''|| data.confirmPass==''){
            sweet.fire({
                title: 'All Fields Are Required',
                icon:"warning",
                timer:1000
              })
        }
        else if(Errors.firstName==''&& Errors.lastName==''&& Errors.emailAdd=='' && Errors.password==''&& Errors.confirmPass==''){
            let formData = new FormData()
            formData.append('photo', data.photo)
            formData.append('firstName', data.firstName)
            formData.append('lastName', data.lastName)
            formData.append('emailAdd', data.emailAdd)
            formData.append('password', data.password)
            addUser(formData)
            .then(res => {
                if (res.data.err == 1) {
                    sweet.fire({
                        title: res.data.message,
                        icon:"warning",
                        timer:2000
                      })
                }
                else {
                    sweet.fire({
                        title: res.data.message,
                        text:"Registered Successfully",
                        icon:"success",
                      })

                    navigate('/')
                }
            })
    }
    }

    return (
        <div className='registerBackground'>
            <Container className='registerContainer'>
                <h1 className=''>Welcome to Parking Stars</h1>
                <Form className="registerForm">
                    <h1>Register here</h1>
                    {Errors.firstName.length > 0 &&
                        <span style={{ color: "red" }}>{Errors.firstName}</span>}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control type="text" placeholder="First Name" className='py-2' name="firstName" onChange={handleRegisterData} />
                    </Form.Group>
                    {Errors.lastName.length > 0 &&
                        <span style={{ color: "red" }}>{Errors.lastName}</span>}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Control type="text" placeholder="Last Name" className='py-2' name="lastName" onChange={handleRegisterData} />
                      
                    </Form.Group>
                    {Errors.emailAdd.length > 0 &&
                        <span style={{ color: "red" }}>{Errors.emailAdd}</span>}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Control type="email" placeholder="Email Address" className='py-2' name="emailAdd" onChange={handleRegisterData} />

                    </Form.Group>
                    {Errors.password.length > 0 &&
                        <span style={{ color: "red" }}>{Errors.password}</span>}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Control type={password} placeholder="Password" onChange={handleRegisterData} name="password" required />
                    </Form.Group>
                    {Errors.confirmPass.length > 0 &&
                        <span style={{ color: "red" }}>{Errors.confirmPass}</span>}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Control type={passwords} placeholder=" Confrim Password" onChange={handleRegisterData} name="confirmPass" required />
                    </Form.Group>
                    <Form.Label className='text-dark label2'>Profile Photo :</Form.Label>
                    <Form.Group className="mb-3" >
                        <Form.Control type="file" formEncType='multipart/form-data' name="image" id="image"onChange={handlePhoto}/>
                       
                    </Form.Group>
                    <Button className="text-black" onClick={submitRegisterData}>Register</Button>
                    <p>Already Registered user?</p><Link to="/" ><Button variant="warning">Login here</Button></Link>
                </Form>
        
            </Container>

        </div>
    )
}

export default Register