import { useState } from 'react';
import LoginSignupForm from './LoginSignupForm';
import './WelcomePage.css';

export default function WelcomePage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin();
  };

  console.log("WelcomePage ???????????");

  return (
    <>
        <h1>Welcome Page Animations</h1>
        <div className="handwritten-typewriter">
            <p className="handwritten-text">Once Upon an Easel</p>
            {/* <p>A gallery experience</p> */}
        </div>
        <LoginSignupForm />
    </>
  );
}

// export default function WelcomePage() { 
//     return (
//         <div>Welcome to the App!</div>
//     )
// }
