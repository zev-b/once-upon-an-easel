import { useState } from 'react';
import LoginSignupForm from './LoginSignupForm';

export default function WelcomePage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin();
  };

  console.log("WelcomePage ???????????");

  return (
    <>
    <h1>Welcome Page Animations</h1>
        <LoginSignupForm />
    </>
  );
}

// export default function WelcomePage() { 
//     return (
//         <div>Welcome to the App!</div>
//     )
// }
