// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection,addDoc,serverTimestamp } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {

  apiKey: "AIzaSyBtAASDKvhlfEdr-exwYvT3Ec888cz8-VY",
  authDomain: "kallunaattori.firebaseapp.com",
  projectId: "kallunaattori",
  storageBucket: "kallunaattori.appspot.com",
  messagingSenderId: "806543205017",
  appId: "1:806543205017:web:0e8737801420bd0faa4e08"
};


//const app = initializeApp(firebaseConfig);

initializeApp(firebaseConfig);

const firestore = getFirestore();

const MESSAGES = 'messages';

export {
  firestore,
  collection,
  addDoc,
  serverTimestamp,
  MESSAGES
};