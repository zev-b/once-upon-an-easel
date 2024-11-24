import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

export default function LoginForm() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

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
      });
  };

//   const toggleForm = () => {
//     setIsLogin();
//   };

  return (
    <>
    <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button 
        type="submit"
        disabled={buttonDisabled}
        >
          Log In
        </button>
      </form>

      <button 
      onClick={handleDemoLogin} 
      className="demo-login-button" 
      style={{margin: '0 auto'}}
      >
        Log in as Demo User
      </button>
    </>
  );
}