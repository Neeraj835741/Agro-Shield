import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";

export async function getHealthReports() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Please log in to view health history.");
  }

  const reportsQuery = query(
    collection(db, "users", user.uid, "healthReports"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(reportsQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}