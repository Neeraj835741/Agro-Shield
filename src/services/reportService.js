import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export async function saveHealthReport(report) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Please log in before saving a health report.");
  }

  const documentReference = await addDoc(
    collection(db, "users", user.uid, "healthReports"),
    {
      ...report,
      createdAt: serverTimestamp(),
    }
  );

  return documentReference.id;
}