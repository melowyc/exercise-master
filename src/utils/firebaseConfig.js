import {initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp ({
  apiKey: "AIzaSyCnkJAyRet8WTZSd_wAUC_3pHT7yHvZp-k",
  authDomain: "fir-d4202.firebaseapp.com",
  projectId: "fir-d4202",
  storageBucket: "fir-d4202.appspot.com",
  messagingSenderId: "219264912949",
  appId: "1:219264912949:web:bdc4dc1051e3af808c6b7c",
  measurementId: "G-5P9XL9BTNC"
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;