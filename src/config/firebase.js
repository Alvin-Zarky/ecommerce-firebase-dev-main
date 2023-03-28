import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAUGHbaCrunrT15i3tVIq04_hr5MPIyw7E",
  authDomain: "dev-ecommerce-shop.firebaseapp.com",
  projectId: "dev-ecommerce-shop",
  storageBucket: "dev-ecommerce-shop.appspot.com",
  messagingSenderId: "601108599602",
  appId: "1:601108599602:web:698310e4eb623149b8bd2b"
};

firebase.initializeApp(firebaseConfig)

const firestore= firebase.firestore()
const database= firebase.database()
const auth= firebase.auth()
const storage= firebase.storage()
const timestamp= firebase.firestore.FieldValue.serverTimestamp()

export {
  firestore,
  database,
  auth,
  storage,
  timestamp
}