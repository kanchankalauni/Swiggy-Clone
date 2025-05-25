import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkVsQvRTgxMssR41jB_t267rscaDhG2YM",
  authDomain: "swiggy-project-f48db.firebaseapp.com",
  projectId: "swiggy-project-f48db",
  storageBucket: "swiggy-project-f48db.firebasestorage.app",
  messagingSenderId: "612021570337",
  appId: "1:612021570337:web:876ba226e0a8b99c9f0c60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider}