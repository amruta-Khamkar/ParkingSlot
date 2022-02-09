import React, { useRef, useState, useEffect } from 'react'
import { Button, Row, Col, Card, Form, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import sweet from 'sweetalert2'
import { loginUser,bookSlot } from '../API/apiCalls';
import '../CSS/login.css'

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);

function Login() {
    const [loginData, setLoginData] = useState({
        emailAdd: '',
        password: ''
    })
    const [eye, seteye] = useState(true);
    const [password, setpassword] = useState("password");
    const [type, settype] = useState(false);
    const [show, setShow] = useState(false)
    const [state, setState] = useState({
        flag: 0
    })
    const history = useLocation();
    const Eye = () => {
        if (password == "password") {
            setpassword("text");
            seteye(false);
            settype(true);
        }
        else {
            setpassword("password");
            seteye(true);
            settype(false);
        }
    } 
    const navigate = useNavigate()
    const handleLoginData = (event) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value })
        console.log(loginData)
    }
    const loggedIn = () => {
        if(loginData.emailAdd==''|| loginData.password==''){
            sweet.fire({
                title: "All Fields are Required",
                icon:"warning",
                timer:2000 
              })
        }
        else{
            loginUser({ emailAdd: loginData.emailAdd, password: loginData.password }).then((res) => {
                    if (res.data.err == 0) {
                        sweet.fire({
                            title:  res.data.message,
                            icon:"success",
                            timer:2000
                          })
                          localStorage.setItem("_token", res.data.token);
                        navigate('/dashboard')

                    } else if (res.data.err == 1) {
                        sweet.fire({
                            title:  res.data.message,
                            icon:"error",
                            timer:1000
                          })

                    }
                })
    }
    }


    return (
        <div className='loginBackground'>
            <Container className='loginContainer'>
                <h1 className="dark">Welcome to Parking Stars!</h1>
                    <Form className='loginForm'>
                        <h2>Sign In</h2>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='text-dark mt-2 label1'>Email address:</Form.Label>
                            <Form.Control type="email"  onChange={handleLoginData} name="emailAdd" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label className='text-dark label2'>Password:</Form.Label>
                            <Form.Control type="password"  onChange={handleLoginData} name="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" onClick={loggedIn}>
                           Login
                        </Button>
                    <p>Ohh! Are you a new user??? </p>
                   <Link to="/register"><Button variant="success" >Create a account</Button></Link>
                    </Form>
            {
                state.flag == 1 && <Navigate to="/dashboard" />
            }
            </Container>
        </div>
    )
}

export default Login