import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
import {  getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-wSGADoy_aoK1j-ZBLrWacLaYyXAi6Vs",
  authDomain: "darulfaida-6eb79.firebaseapp.com",
  projectId: "darulfaida-6eb79",
  storageBucket: "darulfaida-6eb79.appspot.com",
  messagingSenderId: "86320605806",
  appId: "1:86320605806:web:1e75eaa258498df50ad47f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase
export const storage = getStorage(app);
export const db = getFirestore(app)
