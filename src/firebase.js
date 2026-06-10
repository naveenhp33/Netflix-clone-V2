// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXM5FdXpAj4S91Yji3X1zD56ER7DksY1E",
  authDomain: "netflix-clone-97aa4.firebaseapp.com",
  projectId: "netflix-clone-97aa4",
  storageBucket: "netflix-clone-97aa4.firebasestorage.app",
  messagingSenderId: "423185544592",
  appId: "1:423185544592:web:5812b72d48ee51e7542f15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name,email,password)=>{

    try {
       const res = await createUserWithEmailAndPassword(auth,email,password);
       const user = res.user;
       await addDoc(collection(db,"users"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
 });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        }

}

const login = async (email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}


const logout = () =>{
    signOut(auth);
}

export{auth, db, login, signup, logout};