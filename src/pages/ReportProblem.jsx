import { useRef, useState } from "react";
import { commonSymptoms } from "../data/symptoms";
import { diagnoseCrop } from "../utils/diagnosisUtils";
import { getSeasonFromDate } from "../utils/seasonUtils";
import { saveHealthReport } from "../services/reportService";
import {
  isVoiceRecognitionSupported,
  startVoiceRecognition,
} from "../utils/voiceUtils";

function ReportProblem() {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState("");
  const [voiceTranscript, setVoiceTranscript] = useState("");

  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  const recognitionRef = useRef(null);

  const symptomList = Array.isArray(commonSymptoms) ? commonSymptoms : [];

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageName(file.name);
    }
  }

  function handleSymptomToggle(symptom) {
    setSelectedSymptoms((previousSymptoms) =>
      previousSymptoms.includes(symptom)
        ? previousSymptoms.filter((item) => item !== symptom)
        : [...previousSymptoms, symptom]
    );
  }

  function handleRecordVoice() {
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    if (!isVoiceRecognitionSupported()) {
      setSaveStatus(
        "Voice input is unavailable in this browser. Please type your symptoms."
      );
      return;
    }

    try {
      const recognitionInstance = startVoiceRecognition({
        language: "en-IN",

        onStart: () => {
          setIsRecording(true);
          setSaveStatus("Listening... Describe the crop problem.");
        },

        onResult: (transcript) => {
          setVoiceTranscript(transcript);

          const spokenWords = transcript.toLowerCase();

          const matchedSymptoms = symptomList.filter((symptom) =>
            spokenWords.includes(symptom.toLowerCase())
          );

          if (matchedSymptoms.length > 0) {
            setSelectedSymptoms((previousSymptoms) => [
              ...new Set([...previousSymptoms, ...matchedSymptoms]),
            ]);
          }

          setSaveStatus("Voice input captured.");
        },

        onError: () => {
          setSaveStatus(
            "Voice input failed. Please type the symptoms in the text box."
          );
        },

        onEnd: () => {
          setIsRecording(false);
          recognitionRef.current = null;
        },
      });

      recognitionRef.current = recognitionInstance;
    } catch (error) {
      setSaveStatus(error.message);
    }
  }

  async function handleRunDiagnosis(event) {
    event.preventDefault();

    if (!selectedCrop || selectedSymptoms.length === 0) {
      setSaveStatus("Please select a crop and at least one symptom.");
      return;
    }

    setIsSubmitting(true);
    setDiagnosisResult(null);
    setSaveStatus("");

    try {
      const currentSeason = getSeasonFromDate(new Date().toISOString());

      const result = diagnoseCrop(
        selectedCrop,
        selectedSymptoms,
        currentSeason
      );

      setDiagnosisResult(result);

      await saveHealthReport({
        crop: selectedCrop,
        symptoms: selectedSymptoms,
        season: currentSeason,
        voiceTranscript,
        imageName,
        diagnosis: result.found ? result.diagnosis : "No clear match",
        confidence: result.confidence || null,
        severity: result.severity || "",
        treatment: result.treatment || "",
        prevention: result.prevention || "",
        safetyNote: result.safetyNote || "",
      });

      setSaveStatus(
        result.found
          ? "Report saved successfully!"
          : "Report saved. Please consult a nearby agriculture expert."
      );
    } catch (error) {
      console.error("Diagnosis error:", error);
      setSaveStatus("Failed to save the report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ color: "#14532d" }}>Crop Health & Diagnosis Tool</h1>

      <p style={{ color: "#4b5563" }}>
        Select your crop and symptoms to receive preliminary crop-health
        guidance.
      </p>

      <form
        onSubmit={handleRunDiagnosis}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "24px",
          backgroundColor: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "16px",
        }}
      >
        <div>
          <label
            style={{
              fontWeight: "bold",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Select Crop
          </label>

          <select
            value={selectedCrop}
            onChange={(event) => setSelectedCrop(event.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Choose Crop --</option>
            <option value="Wheat">Wheat</option>
            <option value="Rice">Rice</option>
            <option value="Tomato">Tomato</option>
            <option value="Cotton">Cotton</option>
            <option value="Potato">Potato</option>
          </select>
        </div>

        <div>
          <label
            style={{
              fontWeight: "bold",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Observed Symptoms
          </label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "10px",
            }}
          >
            {symptomList.map((symptom) => (
              <label
                key={symptom}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={() => handleSymptomToggle(symptom)}
                />
                {symptom}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label
            style={{
              fontWeight: "bold",
              display: "block",
              marginBottom: "8px",
            }}
          >
            Upload Crop Photo
          </label>

          <input type="file" accept="image/*" onChange={handleImageChange} />

          <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
            Photo preview is available now. Current diagnosis uses selected
            symptoms; image AI will be added later.
          </p>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Crop preview"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={handleRecordVoice}
            style={{
              padding: "10px 16px",
              backgroundColor: isRecording ? "#ef4444" : "#0284c7",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isRecording ? "Listening... Click to stop" : "Record Voice"}
          </button>
        </div>

        <textarea
          value={voiceTranscript}
          onChange={(event) => setVoiceTranscript(event.target.value)}
          placeholder="Voice transcript or additional symptoms will appear here."
          style={{
            width: "100%",
            minHeight: "85px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "12px 24px",
            backgroundColor: isSubmitting ? "#86efac" : "#166534",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Analyzing..." : "Run Diagnosis"}
        </button>
      </form>

      {saveStatus && (
        <p
          style={{
            marginTop: "16px",
            fontWeight: "bold",
            color: saveStatus.includes("Failed") ? "#b91c1c" : "#166534",
          }}
        >
          {saveStatus}
        </p>
      )}

      {diagnosisResult && diagnosisResult.found && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #86efac",
            backgroundColor: "#f0fdf4",
            borderRadius: "12px",
          }}
        >
          <h2 style={{ color: "#14532d", marginTop: 0 }}>
            Possible Issue: {diagnosisResult.diagnosis}
          </h2>

          <p style={{ fontWeight: "bold", color: "#166534" }}>
            Match confidence: {diagnosisResult.confidence}%
          </p>

          <p>
            <strong>Severity:</strong> {diagnosisResult.severity}
          </p>

          <div style={{ marginTop: "15px" }}>
            <h3>Recommended Treatment</h3>
            <p>{diagnosisResult.treatment}</p>
          </div>

          <div style={{ marginTop: "15px" }}>
            <h3>Prevention Advice</h3>
            <p>{diagnosisResult.prevention}</p>
          </div>

          {diagnosisResult.safetyNote && (
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                backgroundColor: "#fef2f2",
                borderLeft: "4px solid #ef4444",
                color: "#991b1b",
              }}
            >
              <strong>Safety Note:</strong> {diagnosisResult.safetyNote}
            </div>
          )}
        </div>
      )}

      {diagnosisResult && !diagnosisResult.found && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #f59e0b",
            backgroundColor: "#fffbeb",
            borderRadius: "12px",
          }}
        >
          <h2>No clear diagnosis found</h2>
          <p>{diagnosisResult.message}</p>
          <p>
            Please contact a nearby agriculture expert for further guidance.
          </p>
        </div>
      )}
    </div>
  );
}

export default ReportProblem;