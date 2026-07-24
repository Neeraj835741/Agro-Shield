import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function saveHealthReport(report) {
  const documentReference = await addDoc(collection(db, "healthReports"), {
    crop: report.crop,
    symptoms: report.symptoms,
    season: report.season || "",
    voiceTranscript: report.voiceTranscript || "",
    imageName: report.imageName || "",
    diagnosis: report.diagnosis || "",
    confidence: report.confidence ?? null,
    severity: report.severity || "",
    treatment: report.treatment || "",
    prevention: report.prevention || "",
    safetyNote: report.safetyNote || "",
    status: "open",
    createdAt: serverTimestamp(),
  });

  return documentReference.id;
}