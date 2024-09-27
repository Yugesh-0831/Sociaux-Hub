import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../pages/apiCalls";
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SnapBook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              className="loginInput"
              type="email"
              ref={email}
            />
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              ref={password}
              required
              //  minLength="6"
            />
            <button className="loginButton" disabled={isFetching} type="submit">
              {isFetching ? (
                <CircularProgress color="secondary" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="secondary" size="20px" />
              ) : (
                "Create a new Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
