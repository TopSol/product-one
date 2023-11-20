// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAadhi_svLHxVBDRavVLvQU8IAZq0Pb49w",
//   authDomain: "marquee-selection.firebaseapp.com",
//   projectId: "marquee-selection",
//   storageBucket: "marquee-selection.appspot.com",
//   messagingSenderId: "632451359864",
//   appId: "1:632451359864:web:0654092986082a3dd8b98d",
//   measurementId: "G-3GBDFBHKS9",
// };
const firebaseConfig = {
  apiKey: "AIzaSyB-LdYY8GEgHh5MgPlF5-vHLFX4GxvuqHg",
  authDomain: "verbundenheit-40632.firebaseapp.com",
  projectId: "verbundenheit-40632",
  storageBucket: "verbundenheit-40632.appspot.com",
  messagingSenderId: "670605792815",
  appId: "1:670605792815:web:14367c3d8e393f80b118da",
  measurementId: "G-2DZD3DHN0X",
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
// const messaging = getMessaging(app);

export const db = getFirestore(app);  
export const collection = db.collection
export const auth = getAuth(app);
export const storage = getStorage(app);
