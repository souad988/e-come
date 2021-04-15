import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAo4TiwaeoomKgMwLxL8FosA3oiVlH-NzU",
    authDomain: "e-com-909cc.firebaseapp.com",
    databaseURL: "https://e-com-909cc.firebaseio.com",
    projectId: "e-com-909cc",
    storageBucket: "e-com-909cc.appspot.com",
    messagingSenderId: "261400038152",
    appId: "1:261400038152:web:17a210b6f52dbc52eebabd",
    measurementId: "G-RYSJ6NMEYW"
});

const db = firebaseApp.firestore();
const myauth = firebase.auth();

export {db , myauth};