
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
  apiKey: "AIzaSyCF2j9uXA1ENrsogHncqv-jfWIpKMZOHr4",
  authDomain: "demo3-8f0c6.firebaseapp.com",
  projectId: "demo3-8f0c6",
  storageBucket: "demo3-8f0c6.appspot.com",
  messagingSenderId: "621232142846",
  appId: "1:621232142846:web:bfb7bd3df39fe78d6c28af",
  measurementId: "G-EEV6BZ5QVG"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics, auth, db };

