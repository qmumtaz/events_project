import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';


const SignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          role: 'member', 
        });
        console.log('New user created with role: member');
      } else {
        console.log('User already exists with role:', userDocSnap.data().role);
      }
  
      console.log('User signed in:', user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};


export {SignInWithGoogle , signOutUser}