import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const isProUser = async (): Promise<boolean> => {
  const user = auth.currentUser;
  if (!user) return false;
  
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  return userDoc.exists() && userDoc.data()?.proUser === true;
};

export const checkProAccess = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        resolve(false);
        return;
      }
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      resolve(userDoc.exists() && userDoc.data()?.proUser === true);
    });
  });
};

export const updateProStatus = async (isPro: boolean): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user');
  
  await setDoc(doc(db, 'users', user.uid), {
    proUser: isPro,
    email: user.email,
    updatedAt: new Date().toISOString()
  }, { merge: true });
}; 