// Ссылка на документацию: https://firebase.google.com/docs/web/setup?authuser=0&hl=en
import { FirebaseApp } from "@firebase/app-types";
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAJxRpwaEfKfGYkXjyk6dPAy82noOBLKXg",
  authDomain: "fantasyshop-a4a0b.firebaseapp.com",
  projectId: "fantasyshop-a4a0b",
  storageBucket: "fantasyshop-a4a0b.appspot.com",
  messagingSenderId: "891225945011",
  appId: "1:891225945011:web:041f3f08fef9cc63c011c6",
  measurementId: "G-3Q8P19HFC6",
};

class FirebaseApi {
  private readonly firebaseApp: FirebaseApp;
  private readonly firestore: Firestore;

  constructor() {
    this.firebaseApp = initializeApp(firebaseConfig) as FirebaseApp;
    this.firestore = getFirestore(this.firebaseApp);
  }
}

export const firebaseApi = new FirebaseApi();


