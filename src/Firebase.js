import firebase from "firebase/app";          //importing firebase app already present in package.json list
import  "firebase/auth";



export const auth = firebase.initializeApp({                    //exporting the auth created by firebase and all id's &    
    apiKey: "AIzaSyAtAG3LfoNnVoZNO5DHtN9v5kY2v1o3kbs",          //initialising the app using firebase as well as line 13
    authDomain: "mchat-66f14.firebaseapp.com",
    projectId: "mchat-66f14",
    storageBucket: "mchat-66f14.appspot.com",
    messagingSenderId: "442530921873",
    appId: "1:442530921873:web:c2d1a2e2273b560beaae30"
  }).auth();                                              //  calling auth() function which is chained  with initialise app













// // Imports the function I need from the SDKs


// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// // My web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAtAG3LfoNnVoZNO5DHtN9v5kY2v1o3kbs",
//   authDomain: "mchat-66f14.firebaseapp.com",
//   projectId: "mchat-66f14",
//   storageBucket: "mchat-66f14.appspot.com",
//   messagingSenderId: "442530921873",
//   appId: "1:442530921873:web:c2d1a2e2273b560beaae30"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () =>{
//   signInWithPopup(auth,provider).then((res)=>{
//     const mail =res.user.email;
//     const name =res.user.displayName;
//     const profilePic =res.user.photoURL;


//     localStorage.setItem("email", mail);
//     localStorage.setItem("username", name);
//     localStorage.setItem("profile", profilePic);
//   }).catch(error=>console.log(error))
// }
