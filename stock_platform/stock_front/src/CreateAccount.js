import React, { useState } from "react";
import Axios from 'axios';

function CreateAccount(props) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [createAccountStat, setCreateAccountStat] =   useState("");
  function insertUser(x) {
    Axios.post('http://localhost:3002/api/insertUser', {
      name: username,
      email: email,
      password: password
    }).then((response) => {
      //login
      props.userLogin(username);
    })
  }

  const checkCreateAccount = () => {
    console.log(username);
    console.log(email);
    console.log(password);

    Axios.post('http://localhost:3002/api/checkUser', {
      name: username,
      email: email,
      password: password
    }).then((response) => {
      console.log(response.data)
      if (response.data == "1") {
        setCreateAccountStat(response.data);
      } else {
        insertUser(username)
      }
    })
  };


  let error_message = "";
  if (createAccountStat == "1") {
    error_message = "Username already exists";
  }

  return (
    <div className="LoginPage">
      <div>
        <p className="LoginText">Create Account</p>
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
        <input
          className="LoginInput"
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div>
        <button
          className="LoginButton"
          name={"Home"}
          onClick={checkCreateAccount}
        >
          Create
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

export default CreateAccount;
