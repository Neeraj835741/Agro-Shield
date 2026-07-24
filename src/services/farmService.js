import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

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