import { getApps, initializeApp, FirebaseApp } from 'firebase/app';
import * as Facebook from 'expo-facebook';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import * as configJSON from './firebase.json';

if(getApps().length === 0){
  initializeApp(configJSON);
  Facebook.initializeAsync({
    appId: '635693490984759',
  });
}

const auth = getAuth();
const firestore = getFirestore();
// const db = getFirestore();
const rtdb = getDatabase();

export { auth, firestore, rtdb } //, db };