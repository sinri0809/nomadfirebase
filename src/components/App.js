/* eslint-disable */
import React, { useState, useEffect } from 'react';
import AppRouter from './Router';
import {authService} from '../fbase';
import Navigation from './Navigation';


function App() {
  const [init, setInit] = useState(false);
  // 처음 시작할 때는 currnetuser가 null임.(너무 빨라서)
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    // Auth가 변하는 걸 감지?하는 메소드 사용 
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  
  return <>
    {init
    ? 
    <AppRouter isLoggedIn={isLoggedIn} />
    :
    "Initializing..."
    }
    <footer>&copy; Sinri {new Date().getFullYear()}</footer>
  </>
}

export default App;
