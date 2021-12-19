/* eslint-disable */

import React, { useState } from "react";
import {authService} from "../fbase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
  } from "firebase/auth";

const Auth = () => {
  // console.error(authService);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const toggleAccount = () => setNewAccount((prev) => !prev);
  const onChange = (e) => {
    // 구조 분해 할당 Destructuring assignment
    const { target : {name, value}} = e;
    if(name === "email"){
      setEmail(value)
    }else if(name === "password"){
      // 이게 firebase 차원에서 6자 미만은 비밀번호로 못하도록 설정했나 봅니다..
      setPassword(value)
    }
  };

  const onSocialClick = async (event) => {
    const { target : {name, value}} = event;
    let provider;
    if(name === "google"){
      provider = new GoogleAuthProvider();
    }else if(name === "github"){
      provider = new GithubAuthProvider();
    }
    // log in할 수 있는 창 띄우는 거임
    const result = await signInWithPopup(authService, provider)
    console.log(result);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      let data;
      if(newAccount){
        // create account
        // 이 method 하나만 있으면 정말 간편하게 사용자 계정을 만들 수 있도록 도와준다. 
        data = await createUserWithEmailAndPassword(authService, email, password);
      }else{
        //log In
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data)
    }catch(error){
      setError("!! Already has account");
      console.log(error.message);
      // throw new Error("failed Authentication")
    }
  };

  return <div>
    <form onSubmit={onSubmit} >
      <input name="email" type="email" placeholder="Email" 
        required
        value={email}
        onChange={onChange}
      />
      <input name="password" type="password" placeholder="PW" 
        required 
        value={password}
        onChange={onChange}
      />
      <input type="submit" value={newAccount ? "create account" : "Log In"} />
      <span>{error}</span>
    </form>
    <span onClick={toggleAccount}>
      {newAccount?"Sign In":"Create Account"}
    </span>
    <div>
      <button onClick={onSocialClick} name="google">login with Google</button>
      <button onClick={onSocialClick} name="github">login with Github</button>
    </div>
  </div>
}
export default Auth;