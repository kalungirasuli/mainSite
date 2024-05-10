import { signInWithEmailAndPassword } from "firebase/auth";

const useSignInWithEmailAndPassword = async (email,password) => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log("Signed in User ", { res });
      
   
    } catch (e) {
      console.error(e);
    }
  };

  export default useSignInWithEmailAndPassword;

// the below code fragment can be found in: