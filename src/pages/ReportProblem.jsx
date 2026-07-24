import React, { useState, useRef } from "react";
// Import commonSymptoms replacing the hard-coded symptomList
import { commonSymptoms } from "../data/symptoms";

// Import required utility and service functions
import { diagnoseCrop } from "../utils/diagnosisUtils";
import { getSeasonFromDate } from "../utils/seasonUtils";
import { saveHealthReport } from "../services/reportService";
import { startVoiceRecognition } from "../utils/voiceUtils";

function ReportProblem() {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Real diagnosis state
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  // Handle local image upload preview ONLY 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRecordVoice = () => {
    // 1. If we are already recording, force it to stop immediately!
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      return; // Exit early so we don't start a new one
    }

    // 2. Otherwise, start a new recording session
    try {
      const recognitionInstance = startVoiceRecognition({
        language: 'en-IN',
        onStart: () => {
          setIsRecording(true);
        },
        onResult: (transcript) => {
          console.log("Heard:", transcript);
          
          if (transcript) {
            const spokenWords = transcript.toLowerCase();
            const matchedSymptoms = commonSymptoms.filter((symptom) => 
              spokenWords.includes(symptom.toLowerCase())
            );
            
            if (matchedSymptoms.length > 0) {
              setSelectedSymptoms((prevSelected) => {
                const allSymptoms = [...prevSelected, ...matchedSymptoms];
                return [...new Set(allSymptoms)]; 
              });
            }
          }
        },
        onError: (errorMessage) => {
          console.error("Voice error:", errorMessage);
        },
        onEnd: () => {
          setIsRecording(false);
          recognitionRef.current = null; // Clear the memory when done
        }
      });

      // 3. Save the active microphone session to our ref so we can stop it later
      recognitionRef.current = recognitionInstance;

    } catch (error) {
      alert(error.message);
    }
  };

  // Toggle symptom selection
  const handleSymptomToggle = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  // Run Diagnosis Logic
  const handleRunDiagnosis = async (e) => {
    e.preventDefault();
    if (!selectedCrop || selectedSymptoms.length === 0) {
      alert("Please select a crop and at least one symptom.");
      return;
    }

    setIsSubmitting(true);
    setSaveStatus("");

    try {
      // Calculate current season
      const currentSeason = getSeasonFromDate(new Date());

      // Call diagnoseCrop with input parameters
      // Pass the arguments separately instead of inside an object
      const result = diagnoseCrop(selectedCrop, selectedSymptoms, currentSeason);

      // Display real diagnosis results
      setDiagnosisResult(result);

      // Save health report
      await saveHealthReport({
        crop: selectedCrop,
        symptoms: selectedSymptoms,
        season: currentSeason,
        diagnosis: result.diagnosis,
        confidence: result.confidence,
        treatment: result.treatment,
        prevention: result.prevention,
        safetyNote: result.safetyNote,
        createdAt: new Date().toISOString(),
      });

      setSaveStatus("Report saved successfully!");
    } catch (error) {
      console.error("Diagnosis error:", error);
      setSaveStatus("Failed to save report.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Crop Health & Diagnosis Tool</h1>
      <p>Select your crop and symptoms to identify potential issues.</p>

      <form onSubmit={handleRunDiagnosis} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* Crop Selection */}
        <div>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>Select Crop:</label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
          >
            <option value="">-- Choose Crop --</option>
            <option value="Wheat">Wheat</option>
            <option value="Rice">Rice</option>
            <option value="Tomato">Tomato</option>
            <option value="Cotton">Cotton</option>
            <option value="Maize">Maize</option>
          </select>
        </div>

        {/* Symptoms Checklist using commonSymptoms */}
        <div>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>Observed Symptoms:</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
            {commonSymptoms && commonSymptoms.map((symptom, idx) => (
              <label key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
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

        {/* Local Image Upload & Preview Only */}
        <div>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>Upload Photo (Preview Only):</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
            * Note: Photos are for visual preview; diagnosis is driven by symptom selections.
          </p>

          {imagePreview && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={imagePreview}
                alt="Crop Preview"
                style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px", border: "1px solid #ddd" }}
              />
            </div>
          )}
        </div>

        <button 
          type="button" 
          onClick={handleRecordVoice}
          disabled={isRecording}
          style={{ 
            padding: "8px 16px", 
            backgroundColor: isRecording ? "#ef4444" : "#0284c7", // Turns red when recording!
            color: "white", 
            borderRadius: "8px", 
            border: "none", 
            marginBottom: "15px",
            cursor: isRecording ? "not-allowed" : "pointer",
            fontWeight: "bold"
          }}
        >
          {isRecording ? "🔴 Listening... Click to stop" : "🎤 Record Voice"}
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "12px 24px",
            backgroundColor: "#166534",
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

      {/* Results Display */}
      {diagnosisResult && (
        <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #86efac", backgroundColor: "#f0fdf4", borderRadius: "12px" }}>
          <h2 style={{ color: "#14532d", marginTop: 0 }}>{diagnosisResult.diagnosis}</h2>
          
          <p style={{ fontWeight: "bold", color: "#166534" }}>
            Match confidence: {diagnosisResult.confidence}%
          </p>

          <div style={{ marginTop: "15px" }}>
            <h3>Recommended Treatment:</h3>
            <p>{diagnosisResult.treatment}</p>
          </div>

          <div style={{ marginTop: "15px" }}>
            <h3>Prevention Advice:</h3>
            <p>{diagnosisResult.prevention}</p>
          </div>

          {diagnosisResult.safetyNote && (
            <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#fef2f2", borderLeft: "4px solid #ef4444", color: "#991b1b" }}>
              <strong>Safety Note:</strong> {diagnosisResult.safetyNote}
            </div>
          )}

          {saveStatus && (
            <p style={{ marginTop: "15px", fontSize: "14px", fontWeight: "bold", color: saveStatus.includes("successfully") ? "#15803d" : "#b91c1c" }}>
              {saveStatus}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
export default ReportProblem;