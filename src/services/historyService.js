import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

export async function getFarmProfiles() {
  const profilesQuery = query(
    collection(db, "farmProfiles"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(profilesQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}

export async function getHealthReports() {
  const reportsQuery = query(
    collection(db, "healthReports"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(reportsQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}