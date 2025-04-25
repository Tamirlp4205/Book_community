
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
  apiKey: "AIzaSyAlp6RLN05eoQtJaqsXb4hWKXhqRhKRH_w",
  authDomain: "demo9-8665a.firebaseapp.com",
  projectId: "demo9-8665a",
  storageBucket: "demo9-8665a.appspot.com",
  messagingSenderId: "796266200031",
  appId: "1:796266200031:web:6d132c2e733a459583626a",
  measurementId: "G-DX1G0LNRSN"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics, auth, db };

