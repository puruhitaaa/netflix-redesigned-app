import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCS9C2ldJORGP0xMUGQXFHG4KOP6JRoO2E',
  authDomain: 'netflix-redesigned.firebaseapp.com',
  projectId: 'netflix-redesigned',
  storageBucket: 'netflix-redesigned.appspot.com',
  messagingSenderId: '2398764052',
  appId: '1:2398764052:web:7b8b538bfef77e23e8bb01',
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export default app
export { db, auth }
