import jwtDecode from 'jwt-decode';
import React,{useState,useEffect} from 'react';
import {Navbar,Button,Nav,Container} from 'react-bootstrap'
import{Link, useNavigate} from 'react-router-dom'

import '../CSS/navdash.css'
function Navbars() {
  const [data,setData]=useState()
  const navigate=useNavigate()
  useEffect(() => {
    if (localStorage.getItem("_token")) {
      let token = localStorage.getItem('_token');
      let decode = jwtDecode(token);
      setData(decode)
    }
  }, []);
  
  const signOutButton=()=>{
    localStorage.clear()
    navigate('/')
  }
  return <div>
      <Navbar bg="dark" expand="lg">
  <Container>
       <img src="https://images.unsplash.com/photo-1517547093881-96754b9f8f79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHBhcmtpbmclMjBsb2dvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" width="70" height="50" className='rounded-circle logo me-2'/> 
    <Link to='/dashboard' className='text-decoration-none'><Navbar.Brand><span className='text-warning parking'>Parking</span><span className='text-success drive' >Stars</span></Navbar.Brand></Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    
    <Navbar.Collapse id="basic-navbar-nav">
      {
        data!=undefined &&
        <Nav.Link className='text text-white profileText'> Signed in as: <Link to="/profile"className=" text-warning ">{data.firstName} {data.lastName}</Link></Nav.Link> 
      }
      <Nav.Link><Button variant="danger"  className="signBtn" onClick={signOutButton}>Sign Out</Button></Nav.Link>
      </Navbar.Collapse>
  
  </Container>
</Navbar> 
  </div>;
}

export default Navbars;
