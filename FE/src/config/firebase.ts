
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import {
  Auth,
  getAuth
} from "firebase/auth";
import {
  Firestore,
  getFirestore
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6ioVuMvsH-IOHfbXCJhGk4ea8OGu3yj0",
  authDomain: "demo12-a0d40.firebaseapp.com",
  projectId: "demo12-a0d40",
  storageBucket: "demo12-a0d40.appspot.com",
  messagingSenderId: "564213453521",
  appId: "1:564213453521:web:523c24eeb71f22fd91abf0",
  measurementId: "G-Y4P0ZEZ0BD"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics, auth, db };

