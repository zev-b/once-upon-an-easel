// import { useState } from 'react';
import LoginSignupForm from './LoginSignupForm';
import './WelcomePage.css';

export default function WelcomePage() {

  return (
    <div className='master-flex'>
        {/* <h1>Welcome Page Animations</h1> */}
        <div className="handwritten-typewriter">
            <p className="handwritten-text">Once Upon an Easel</p>
            {/* <p>A gallery experience</p> */}
        </div>
        <LoginSignupForm />
    </div>
  );
}

