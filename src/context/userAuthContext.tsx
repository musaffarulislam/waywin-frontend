import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase";


function setUpRecaptcha(number: string) {
  try{
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    console.log("setup otp 1", number)
    recaptchaVerifier.render();
    
    console.log("setup otp 2", number)
    return signInWithPhoneNumber(auth, number, recaptchaVerifier)
  }catch(error: any){
    throw new Error(error.message)
  }
}

export const googleSignin = () => {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
};


export default setUpRecaptcha;