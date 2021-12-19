/* eslint-disable */

// import { initializeApp } from "firebase/app";
// version 8 9 문제로compat안에 있는 걸 가져와야 한다??
// 참고: after updating your dependency from v8 to v9 beta, change your import statements to use the “compat” version of each import.

import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
// import { collection } from "firebase/firestore";
import { getFirestore } from "@firebase/firestore";

// .env : git hub 에 key값을 올리기싫어서 하는거랍니다.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_SOTRAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};


const app = firebase.initializeApp(firebaseConfig);
const authService = getAuth(app);
const dbService = getFirestore(app);

const firebaseInstance = firebase;

export {authService, firebaseInstance, dbService};