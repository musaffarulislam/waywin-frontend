import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAt26Mff3owkgy65t1hD1rOJGl9cyGW1nE",
  authDomain: "waywin-phonenumber.firebaseapp.com",
  projectId: "waywin-phonenumber",
  storageBucket: "waywin-phonenumber.appspot.com",
  messagingSenderId: "348826140094",
  appId: "1:348826140094:web:07f42644d58a2eee378def"
};
 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {auth}