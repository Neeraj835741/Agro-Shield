import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { getSoilHealth } from "../utils/soilUtils";

export async function saveSoilTest(soilTest) {
  const ph = Number(soilTest.ph);
  const soilHealth = getSoilHealth(ph);

  const documentReference = await addDoc(collection(db, "soilTests"), {
    farmerId: soilTest.farmerId || "demo-farmer",
    ph,
    nitrogen: soilTest.nitrogen || "",
    phosphorus: soilTest.phosphorus || "",
    potassium: soilTest.potassium || "",
    organicCarbon: soilTest.organicCarbon || "",
    testDate: soilTest.testDate || "",
    healthStatus: soilHealth.status,
    healthAdvice: soilHealth.message,
    createdAt: serverTimestamp(),
  });

  return documentReference.id;
}

export async function getSoilTests() {
  const soilTestsQuery = query(
    collection(db, "soilTests"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(soilTestsQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
}