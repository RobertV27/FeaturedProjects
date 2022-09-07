import React, { useState } from "react";
import Axios from 'axios';

function Login(props) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginStat, setLoginStat] = useState("");

  const checkLogin = () => {
    Axios.post('http://localhost:3002/api/login', {
        username: username,
        password: password
    }).then((response) => {          
        if (response.data == "0") {
          props.userLogin(username);
        } else {
          setLoginStat(response.data)
        }
    })
  };

  let error_message = "";
  if (loginStat == "1") {
    error_message = "Username not found";
  } else if (loginStat == "2") {
    error_message = "Incorrect Password";
  }

  return (
    <div className="LoginPage">
      <div>
        <p className="LoginText">Login</p>
        <input
          className="LoginInput"
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <input
          className="LoginInput"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <button className="LoginButton" name={"Home"} onClick={checkLogin}>
          Login
        </button>
        <button
          className="LoginButton"
          name={"CreateAccount"}
          onClick={props.change_page}
        >
          Create New Account
        </button>
        <button
          className="LoginButton"
          name={"Home"}
          onClick={props.change_page}
        >
          Back
        </button>
      </div>
      <p className="LoginErrorText">{error_message}</p>
    </div>
  );
}

export default Login;
