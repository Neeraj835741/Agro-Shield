import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// 1. Saves or updates the profile
export async function saveFarmProfile(profile) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Please log in before saving your farm profile.");
  }

  await setDoc(
    doc(db, "users", user.uid),
    {
      ...profile,
      email: user.email,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

// 2. Fetches the profile to pre-fill the UI
export async function getFarmProfile() {
  const user = auth.currentUser;

  // If no one is logged in, just return null
  if (!user) return null;

  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    // If they have saved a profile before, send that data back to the form
    if (docSnap.exists()) {
      return docSnap.data();
    }
    
    // If it is a brand new account, return null
    return null;
  } catch (error) {
    console.error("Error fetching farm profile:", error);
    return null;
  }
}