import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:`${process.env.API_KEY}`,
  authDomain: "verbundenheit-40632.firebaseapp.com",
  projectId: "verbundenheit-40632",
  storageBucket: "verbundenheit-40632.appspot.com",
  messagingSenderId: "670605792815",
  appId: "1:670605792815:web:14367c3d8e393f80b118da",
  measurementId: "G-2DZD3DHN0X",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const collection = db.collection
export const auth = getAuth(app);
export const storage = getStorage(app);
