// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAadhi_svLHxVBDRavVLvQU8IAZq0Pb49w",
  authDomain: "marquee-selection.firebaseapp.com",
  projectId: "marquee-selection",
  storageBucket: "marquee-selection.appspot.com",
  messagingSenderId: "632451359864",
  appId: "1:632451359864:web:0654092986082a3dd8b98d",
  measurementId: "G-3GBDFBHKS9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);