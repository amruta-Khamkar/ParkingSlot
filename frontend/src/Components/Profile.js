import React, { useEffect,useState } from 'react';
import jwtDecode from 'jwt-decode';
import '../CSS/profile.css'
import Navbars from './Navbars'
import Footer from './Footer'

function Profile() {
    const [data,setData]=useState()
    useEffect(() => {
     if(localStorage.getItem("_token")){
         let token=localStorage.getItem("_token")
         let decode=jwtDecode(token);
         setData(decode)
     }
    }, []);
    
  return (
  <>
      <Navbars/>
  <div class="wrapper">
      {
          data!=undefined &&
      
  <div class="profile" style={{ background: `url(${data.photo})`}}>
      <div class="overlay">
          <div class="about d-flex flex-column">
              <h4>{data.firstName} {data.lastName}</h4> <span>Email :{data.emailAdd}</span>
          </div>
      </div>
  </div>
}
</div>
<Footer/>
</>
  )
}

export default Profile;
