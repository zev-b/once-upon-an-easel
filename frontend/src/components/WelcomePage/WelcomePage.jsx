// import { useState } from 'react';
import ArtCarousel from './ArtCarousel';
import LoginSignupForm from './LoginSignupForm';
import './WelcomePage.css';

export default function WelcomePage() {

  return (
    <div className='master-flex'>
        <div className="handwritten-typewriter">
            <p className="handwritten-text">Once Upon an Easel</p>
        </div>
        <ArtCarousel />
        <LoginSignupForm />
    </div>
  );
}

