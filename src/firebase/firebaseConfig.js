import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQ46_rBFsX7fLiI8lI13ZLszAji-5Dap0",
  authDomain: "skillstram.firebaseapp.com",
  projectId: "skillstram",
  storageBucket: "skillstram.appspot.com", // fixed
  messagingSenderId: "808620872780",
  appId: "1:808620872780:web:f05626e782746a918ed0e9",
  measurementId: "G-8HHQG561YD"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider(); 
