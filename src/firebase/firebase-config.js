import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9zHUJv5ynDrjU2KngGrdeA4s-KZuWxuE",
  authDomain: "web-movie-16690.firebaseapp.com",
  projectId: "web-movie-16690",
  storageBucket: "web-movie-16690.appspot.com",
  messagingSenderId: "845833462792",
  appId: "1:845833462792:web:a743e8fa3adfae388d1dbd",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
