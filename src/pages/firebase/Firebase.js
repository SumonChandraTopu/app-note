

import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCYKKs4Cr5mThe1I8p-1GSuw5dBgLNODi0",
  authDomain: "react-authentication-1559f.firebaseapp.com",
  projectId: "react-authentication-1559f",
  storageBucket: "react-authentication-1559f.appspot.com",
  messagingSenderId: "1049959566463",
  appId: "1:1049959566463:web:753643d50fae96318a034a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
export {app, auth}