import { useEffect, useState } from 'react';
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
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors({});
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

  const isDisabled = !email || 
                     !username || 
                     !firstName || 
                     !lastName || 
                     password.length < 6 || 
                     username.length < 4;

  useEffect(() => {
    setButtonDisabled(credential.length < 4 || password.length < 6)
  }, [credential, password])

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
    setIsLogin((prev) => !prev);
  };

  return (
    <>
    <form onSubmit={isLogin ? handleLogin : handleSignup}>
        { isLogin ? ( 
          <>
          <input
            type="text"
            value={credential}
            placeholder='Username or Email'
            onChange={(e) => setCredential(e.target.value)}
            required
            />
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        </>
        ) : ( 
        <> {/*//###### Signup #######*/}
          <h1>Sign Up</h1>
          <input
            type="text"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {errors.email && <p>{errors.email}</p>}
          <input
            type="text"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        {errors.username && <p>{errors.username}</p>}
          <input
            type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        {errors.firstName && <p>{errors.firstName}</p>}
          <input
            type="text"
            value={lastName}
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        {errors.lastName && <p>{errors.lastName}</p>}
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
          <p>{errors.password}</p>
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
          <p>{errors.confirmPassword}</p>
        )}
        {/*//###### End Signup #######*/}
        </>  
        ) : null}
        <button 
        type="submit"
        disabled={isLogin ? buttonDisabled : isDisabled}
        >
          Submit
        </button>
      </form>
        <button
        onClick={toggleForm}
        >
          { isLogin ? "Don't have an account? Sign up here!" : "I have an account!" }
          </button>
      <button 
      onClick={handleDemoLogin} 
      className="demo-login-button" 
      style={{margin: '0 auto'}}
      >
        Demo User Login
      </button>
    </>
  );
}