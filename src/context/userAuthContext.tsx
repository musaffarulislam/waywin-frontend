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
      recaptchaVerifier.render(); 
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
