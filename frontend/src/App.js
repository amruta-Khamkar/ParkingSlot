import logo from './logo.svg';
import './App.css';
import { Suspense,lazy,useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Book from './Components/Book';
import Payment from './Components/Payment';
import Profile from './Components/Profile';
const Register=lazy(()=>import('./Components/Register'))
const Login=lazy(()=>import('./Components/Login'))

function App() {
  const navigate=useNavigate()
  useEffect(() => {
  if(!localStorage.getItem("_token")){
    navigate('/')
  }
  }, []);
  
  return (
    <div className="App">
     <Suspense fallback={<div style={{width:"600px",margin:"30px auto"}}><img width="600px" height="600px" src='https://c.tenor.com/qzuj7-PoJTcAAAAM/loading.gif'/></div>}>
      <Routes>
        <Route path="/register"  element={<Register/>}></Route>
        <Route path="/"  element={<Login/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/book' element={<Book/>}></Route>
        <Route path='/payment' element={<Payment/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
      </Suspense>
    </div>
  );
}

export default App;
