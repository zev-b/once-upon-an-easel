import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function LoginSplashPage() {
    const user = useSelector((state) => state.session.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
          .then(closeModal)
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
          .then(closeModal)
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
            }
          });
      };

    return (
        <>
      <h1>Log In</h1>
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