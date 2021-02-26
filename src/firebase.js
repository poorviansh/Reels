import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'
import 'firebase/storage'
// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE__STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE__MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// }
// console.log(config);
firebase.initializeApp({
  apiKey: "AIzaSyCIKDg6rq40D_8F-wWA9UT-7qALPj2_mhI",
  authDomain: "reels-d154f.firebaseapp.com",
  databaseURL: "https://reels-d154f-default-rtdb.firebaseio.com",
  projectId: "reels-d154f",
  storageBucket: "reels-d154f.appspot.com",
  messagingSenderId: "652306721491",
  appId: "1:652306721491:web:5838631cccdc0dc52f0226"
})

export const auth = firebase.auth()
// export const provider =firebase.auth.GoogleAuthProvider();
const firestore = firebase.firestore();
export const database ={
  users:firestore.collection('users'),
  posts:firestore.collection('posts'),
  comments:firestore.collection('comments'),
  // files:firestore.collection('files'),
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
  formatDoc:doc=>{
    return {id:doc.id,...doc.data()}
  }
}
export const storage = firebase.storage();
export default firebase
