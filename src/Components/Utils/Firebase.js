import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDc6AHwYriTnBn_r-olcjvxhiXXFDJjBrU",
    authDomain: "code-jam-smiu.firebaseapp.com",
    projectId: "code-jam-smiu",
    storageBucket: "code-jam-smiu.appspot.com",
    messagingSenderId: "141353679956",
    appId: "1:141353679956:web:79cd6b7661c0919a7fc1c1"
  };


const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={firstName : 'Babar'}) => {

    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)

    const userSnapShot = await getDoc(userDocRef)
    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    if (!userSnapShot.exists()) {
        const { firstName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                firstName, email, createdAt, ...additionalInformation
            });
        } catch (error) {
            console.log('Error While Creating User', error.message);
        }
    }
return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async ( email , password) => {

    if(!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};