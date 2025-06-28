import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HomePage from './comp1/HomePage';
import LoginSelectionPage from './comp1/LoginSelectionPage';
import GuestLogin from './comp1/GuestLogin';
import AdminLogin from './comp1/AdminLogin';
import './App.css';
import HotelListings from './components/HotelListings';
import RoomAvailability from './components/RoomAvailability';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import UserReviews from './components/UserReviews';
import AdminReviews from './components/AdminReviews';
import About from './comp1/About';
import Contact from './comp1/Contact';
import RegisterPage from './comp1/RegisterPage';
import HotelDetails from './components/HotelDetails';
import AddHotel from './components/AddHotel';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {

    document.body.style.opacity = 1;
    document.querySelector('.App').style.opacity = 1;


    gsap.to('body', { 
      opacity: 1, 
      duration: 0.5, 
      ease: 'power2.inOut'
    });

    gsap.utils.toArray('.animate-on-scroll').forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out'
      });
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginSelectionPage />} />
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guest-login" element={<GuestLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/list" element={<HotelListings />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/confirm" element={<BookingConfirmation />} />
          <Route path="/review" element={<UserReviews />} />
          <Route path="/admin" element={<AdminReviews />} />
          <Route path="/room-availability/:hotelID" element={<RoomAvailability />} />
          <Route path="/hotel-details/:hotelId" element={< HotelDetails />} />
          <Route path="/add-hotel" element={<AddHotel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;