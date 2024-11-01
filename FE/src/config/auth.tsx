import { auth, db } from './firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  UserCredential 
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; 
import { toast } from "react-toastify";

interface FirebaseAuthError extends Error {
    code: string;
    message: string;
}
type Role = "admin" | "user";


export const signUp = async (
  name: string, 
  email: string, 
  password: string,
  avatar: string = "",
  bio: string = "Hey There",
  role: Role = "user",
): Promise<void> => {
  try {
    const response: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;

    const userData = {
      uid: user.uid,
      email: user.email,
      username: name, 
      createdAt: new Date(),
      role : role,
      avatar: avatar,
      bio: bio,
      lastSeen: Date.now(),
    };

    await setDoc(doc(db, "users", user.uid), userData);
    console.log("User data saved in Firestore for user:", user.uid);
    
    await setDoc(doc(db, 'chats', user.uid), {
      chats: {
        data: []
      }
    });
    const token = await user.getIdToken();
    localStorage.setItem("token", token);
    console.log("User chat initialized in Firestore for user:", user.uid);

    


    toast.success(`Welcome ${name}! Your account has been created.`); 
  } catch (error: unknown) {
    const firebaseError = error as FirebaseAuthError;
    console.error("Signup error:", firebaseError.message);
    handleFirebaseError(firebaseError);
  }
};

export const login = async (email: string, password: string): Promise<void> => {
  try {
    const response: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;

    if (user) {
      const token = await user.getIdToken();
      localStorage.setItem("token", token);

      toast.success(`Welcome back, ${user.email}!`);
      console.log(`User ${user.email} logged in successfully`, user);
      return;
    }
  } catch (error: unknown) {
    const firebaseError = error as FirebaseAuthError;
    console.error("Login error:", firebaseError.message);
    handleFirebaseError(firebaseError);
  }
};


export const logOut = async () => { 
  try {
    await signOut(auth);
    toast.success("You have been logged out.");
  } catch (error) {
    const firebaseError = error as FirebaseAuthError;
    console.error("SignOut error:", firebaseError.message);
    handleFirebaseError(firebaseError);
  }
};

const handleFirebaseError = (error: FirebaseAuthError) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      toast.error("This email is already in use. Please try another one.");
      break;
    case "auth/weak-password":
      toast.error("Password is too weak. Please choose a stronger password.");
      break;
    case "auth/invalid-email":
      toast.error("Invalid email address. Please provide a valid one.");
      break;
    case "auth/user-not-found":
      toast.error("No user found with this email. Please sign up.");
      break;
    case "auth/wrong-password":
      toast.error("Incorrect password. Please try again.");
      break;
    default:
      toast.error("An unexpected error occurred. Please try again.");
  }
};
