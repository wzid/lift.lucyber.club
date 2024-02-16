import { auth } from "../../service/FirebaseService";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default async function signInWithGoogle() {
  let result = null,
    error = null;
  const provider = new GoogleAuthProvider();

  try {
    result = await signInWithPopup(auth, provider);
  } catch (e) {
    error = e;
  }

  return { result, error };
}