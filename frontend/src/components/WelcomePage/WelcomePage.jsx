import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function WelcomePage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className="login-splash-page">
      <div className="form-container">
        {isLogin ? (
          <>
            <h2>Log In</h2>
            <LoginForm />
            <p>
              Don't have an account?{' '}
              <span className="toggle-link" onClick={toggleForm}>
                Sign up here!
              </span>
            </p>
          </>
        ) : (
          <>
            <h2>Sign Up</h2>
            <SignupForm />
            <p>
              Already have an account?{' '}
              <span className="toggle-link" onClick={toggleForm}>
                Log in here!
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};