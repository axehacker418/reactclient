import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Footer from './components/Footer'
import Login from './pages/Login';
import Register from './pages/Register';

import {
  Routes,
  Route,
} from "react-router-dom";
import AddTrip from './pages/AddTrip';
import TravelBucket from './pages/TravelBucket';



const App = () => {
  return (
    <>
    <Header/>
    <Routes>
      
      <Route path="/" element ={<Home/>}/>
      <Route path="/login" element ={<Login/>}/>
      <Route path="/register" element ={<Register/>}/>
      <Route path="/addtrip" element={<AddTrip/>}/>
      <Route path="/travelbucket" element={<TravelBucket/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App