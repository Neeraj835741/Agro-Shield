import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function saveFarmProfile(profile) {
  const documentReference = await addDoc(collection(db, "farmProfiles"), {
    ...profile,
    createdAt: serverTimestamp(),
  });

  return documentReference.id;
}