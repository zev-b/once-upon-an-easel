import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

export default function LoginSignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    const loginErrors = {};
    if (credential.length < 4) loginErrors.credential = "Credential must be 4 or more characters";
    if (password.length < 6) loginErrors.password = "Password must be 6 or more characters";
  
    setErrors(loginErrors);
    if (Object.keys(loginErrors).length > 0) return

    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }).then(() => navigate("/art-pieces"));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const signupErrors = {};
    if (email.length < 3 || email.length > 256) signupErrors.email = "Email must be between 3 and 256 characters";
    if (username.length < 4 || username.length > 30) signupErrors.username = "Username must be between 4 and 30 characters";
    if (firstName.length < 2) signupErrors.firstName = "Firstname must at least 2 characters";
    if (lastName.length < 2) signupErrors.lastName = "Lastname must at least 2 characters";
    if (password.length < 6) signupErrors.password = "Password must be more than 6 characters";

    setErrors(signupErrors);
    if (Object.keys(signupErrors).length > 0) return

    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      ).catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        }).then(() => navigate("/art-pieces"));
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const handleDemoLogin = () => {
    return dispatch(sessionActions.login({ credential: "demo-user", password: "password" }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      }).then(() => navigate("/art-pieces"));
  };

  const toggleForm = () => {
    setErrors({})
    setIsLogin((prev) => !prev);
  };

  return (
    <div className='form-container'>
    <form className="login-signup-form" onSubmit={isLogin ? handleLogin : handleSignup}>
        { isLogin ? ( 
          <>
          <h2>Login</h2>
          <input
            type="text"
            value={credential}
            placeholder='Username or Email'
            onChange={(e) => setCredential(e.target.value)}
            required
            />
        {errors.credential && (
          <p className='error-message'>{errors.credential}</p>
        )}
        </>
        ) : ( 
        <> {/*//###### Signup #######*/}
          <h2>Sign Up</h2>
          <input
            type="text"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {errors.email && <p className='error-message'>{errors.email}</p>}
          <input
            type="text"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        {errors.username && <p className='error-message'>{errors.username}</p>}
          <input
            type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        {errors.firstName && <p className='error-message'>{errors.firstName}</p>}
          <input
            type="text"
            value={lastName}
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        {errors.lastName && <p className='error-message'>{errors.lastName}</p>}
        {/*//###### End Signup #######*/}
        </>
      )}
          <input
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.password && (
          <p className='error-message'>{errors.password}</p>
        )}
        { !isLogin ? (
          <>  {/*//###### Signup #######*/}
          <input
            type="password"
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
        {errors.confirmPassword && (
          <p className='error-message'>{errors.confirmPassword}</p>
        )}
        {/*//###### End Signup #######*/}
        </>  
        ) : null}
        <button 
        type="submit"
        >
          Submit
        </button>
      </form>
        <button
        onClick={toggleForm}
        className='switch-to-signup'
        >
          { isLogin ? "Don't have an account? Sign up here!" : "I have an account!" }
          </button>
      <button 
      onClick={handleDemoLogin} 
      className="demo-login-button" 
      // style={{margin: '0 auto'}}
      >
        Demo User Login
      </button>
    </div>
  );
}