import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyCBaohOeOtJsW40yf1YVa1gynizSGk2ID0",
  authDomain: "room-agent-2360e.firebaseapp.com",
  projectId: "room-agent-2360e",
  storageBucket: "room-agent-2360e.appspot.com",
  messagingSenderId: "759532411241",
  appId: "1:759532411241:web:1c8de89f85a5106e81c5f8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export const firestore = firebase.firestore();

  export const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

  export const storage = firebase.storage()

  export default firebase;
