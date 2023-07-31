import "../../src/App.css";

import React from "react";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      <div className="mt-300 flex flex-col w-full h-full lg:flex-row justify-around content-center ">
        <div className="grid  place-items-center">
          <h1>Login</h1>
          <Login />
        </div>

        <div className="grid  place-items-center">
          <h1>SignUp</h1>
          <SignUp />
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await axios.post(`http://localhost:3000/auth/login`, {
        username,
        password,
      });
      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userId", result.data.userId);
      navigate("/todos");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <input
          type="text"
          placeholder="username"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);

  const handleSignup = async () => {
    try {
      await axios.post(`http://localhost:3000/auth/register`, {
        fullName: fullname,
        username,
        password,
      });
      alert("regiestered please login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <input
          type="text"
          placeholder="fullname"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={(e) => setFullname(e.target.value)}
        />
        <input
          type="text"
          placeholder="username"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="input input-bordered input-primary w-full max-w-xs"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleSignup}>
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
