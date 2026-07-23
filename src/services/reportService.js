import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function saveHealthReport(report) {
  const documentReference = await addDoc(collection(db, "healthReports"), {
    crop: report.crop,
    symptoms: report.symptoms,
    voiceTranscript: report.voiceTranscript || "",
    imageUrl: report.imageUrl || "",
    location: report.location || "",
    diagnosis: report.diagnosis || "",
    status: "open",
    createdAt: serverTimestamp(),
  });

  return documentReference.id;
}