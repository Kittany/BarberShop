import firebase from 'firebase/app';
import '@firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyCktD99vElpyiKiJZg4CVswQpAbm1CM7Fk",
    authDomain: "barbershop-8e974.firebaseapp.com",
    databaseURL: "https://barbershop-8e974-default-rtdb.firebaseio.com",
    projectId: "barbershop-8e974",
    storageBucket: "barbershop-8e974.appspot.com",
    messagingSenderId: "974897870868",
    appId: "1:974897870868:web:61ad9b8c675399e6928f01",
    measurementId: "G-FQE4SMT0YF"
  };


  
firebase.initializeApp(firebaseConfig);
export default firebase;
