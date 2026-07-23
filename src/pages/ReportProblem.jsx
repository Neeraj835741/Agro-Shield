import { useState } from "react";

function ReportProblem() {
  const [crop, setCrop] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [imageName, setImageName] = useState("");
  const [result, setResult] = useState("");
  const [voiceMessage, setVoiceMessage] = useState("");

  const symptomList = [
    "Yellow leaves",
    "Brown or black spots",
    "Wilting",
    "Insects visible",
    "Holes in leaves",
    "Leaf curling",
  ];

  function toggleSymptom(symptom) {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter((item) => item !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  }

  function handleImageChange(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setImageName(selectedFile.name);
    }
  }

  function handleVoiceInput() {
    setVoiceMessage(
      "Voice input placeholder: voice recording will be connected later."
    );
  }

  function checkCropHealth() {
    if (!crop || symptoms.length === 0) {
      setResult("Please select a crop and at least one symptom.");
      return;
    }

    if (symptoms.includes("Insects visible")) {
      setResult(
        "Possible pest attack detected. Check the underside of leaves, remove heavily affected leaves, and contact an agricultural expert for a suitable treatment."
      );
    } else if (
      symptoms.includes("Brown or black spots") ||
      symptoms.includes("Yellow leaves")
    ) {
      setResult(
        "Possible fungal or nutrient-related crop issue. Avoid overwatering, keep the field clean, and consult an agricultural expert before applying treatment."
      );
    } else {
      setResult(
        "Your crop problem report has been recorded. An expert review or AI diagnosis can be connected here later."
      );
    }
  }

  return (
    <div style={{ maxWidth: "750px", margin: "0 auto" }}>
      <h1>Report Crop Problem</h1>
      <p>Share symptoms and a photo to check your crop health.</p>

      <div
        style={{
          marginTop: "25px",
          padding: "24px",
          border: "1px solid #d1d5db",
          borderRadius: "12px",
          display: "grid",
          gap: "18px",
        }}
      >
        <select
          value={crop}
          onChange={(event) => setCrop(event.target.value)}
          style={{ padding: "12px" }}
        >
          <option value="">Select crop</option>
          <option>Rice</option>
          <option>Wheat</option>
          <option>Maize</option>
          <option>Cotton</option>
          <option>Tomato</option>
          <option>Potato</option>
        </select>

        <div>
          <h3>Select symptoms</h3>

          {symptomList.map((symptom) => (
            <label
              key={symptom}
              style={{ display: "block", marginBottom: "10px" }}
            >
              <input
                type="checkbox"
                checked={symptoms.includes(symptom)}
                onChange={() => toggleSymptom(symptom)}
              />{" "}
              {symptom}
            </label>
          ))}
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Upload crop photo
          </label>

          <input type="file" accept="image/*" onChange={handleImageChange} />

          {imageName && (
            <p style={{ color: "#166534" }}>Selected photo: {imageName}</p>
          )}
        </div>

        <button
          onClick={handleVoiceInput}
          style={{
            backgroundColor: "#fef3c7",
            color: "#92400e",
            border: "1px solid #f59e0b",
            borderRadius: "8px",
            padding: "12px",
            cursor: "pointer",
          }}
        >
          🎤 Use Voice Input
        </button>

        {voiceMessage && <p>{voiceMessage}</p>}

        <button
          onClick={checkCropHealth}
          style={{
            backgroundColor: "#166534",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "13px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Check Crop Health
        </button>

        {result && (
          <div
            style={{
              backgroundColor: "#dcfce7",
              color: "#14532d",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <strong>AgroShield Result</strong>
            <p>{result}</p>
            <small>
              This is preliminary guidance. Consult an agricultural expert
              before using any pesticide or medicine.
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportProblem;