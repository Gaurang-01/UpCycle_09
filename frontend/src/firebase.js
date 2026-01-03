import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAv68W7hj2OI5JEMLGcieexTf6A69rugFA",
  authDomain: "upcycle-connect-718b0.firebaseapp.com",
  projectId: "upcycle-connect-718b0",
  storageBucket: "upcycle-connect-718b0.appspot.com",
  messagingSenderId: "349690322460",
  appId: "1:349690322460:web:a671ee34f6d6ed581d09d9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
