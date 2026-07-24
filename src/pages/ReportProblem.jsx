import { useState } from "react";
import { UploadCloud, Mic, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

function ReportProblem() {
  const [formData, setFormData] = useState({
    crop: "",
    symptoms: [],
    image: null,
  });
  const [imageName, setImageName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);

  const symptomList = [
    "Yellowing leaves",
    "Brown/Black spots",
    "Wilting or drooping",
    "Visible insects/pests",
    "Holes in leaves",
    "Stunted growth",
    "White powdery mildew",
    "Rotting stem/roots"
  ];

  function handleCropChange(e) {
    setFormData({ ...formData, crop: e.target.value });
  }

  function toggleSymptom(symptom) {
    setFormData((prev) => {
      const newSymptoms = prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom];
      return { ...prev, symptoms: newSymptoms };
    });
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImageName(file.name);
    }
  }

 
  function handleAnalyzeCrop(e) {
    e.preventDefault();
    
    if (!formData.crop || formData.symptoms.length === 0) {
      alert("Please select a crop and at least one symptom.");
      return;
    }

    setIsAnalyzing(true);
    setDiagnosis(null);

    // Simulating a network request to an AI model and Firestore
    setTimeout(() => {
      setIsAnalyzing(false);
      setDiagnosis({
        disease: formData.symptoms.includes("Visible insects/pests") ? "Pest Infestation (Aphids/Caterpillars)" : "Fungal Leaf Spot",
        confidence: "87%",
        action: "Remove heavily affected leaves. Apply neem oil extract or a suitable organic fungicide/pesticide during the evening.",
      });


    }, 2000);
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ color: "#14532d", marginBottom: "8px" }}>Diagnose Crop Health</h1>
      <p style={{ color: "#4b5563", marginBottom: "24px" }}>
        Upload a photo and select symptoms. Our system will analyze it and provide treatment guidance.
      </p>

      <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "1fr" }}>
        
        {/* INPUT FORM */}
        <form 
          onSubmit={handleAnalyzeCrop}
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >
          {/* Crop Selection */}
          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>1. Select Crop</label>
            <select 
              value={formData.crop} 
              onChange={handleCropChange}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #d1d5db" }}
            >
              <option value="">-- Choose your crop --</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Cotton">Cotton</option>
              <option value="Tomato">Tomato</option>
              <option value="Potato">Potato</option>
            </select>
          </div>

          {/* Symptoms Checklist */}
          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>2. Select Symptoms</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "10px" }}>
              {symptomList.map((symptom) => (
                <label 
                  key={symptom} 
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px",
                    border: formData.symptoms.includes(symptom) ? "2px solid #166534" : "1px solid #d1d5db",
                    borderRadius: "8px",
                    backgroundColor: formData.symptoms.includes(symptom) ? "#f0fdf4" : "white",
                    cursor: "pointer"
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={formData.symptoms.includes(symptom)} 
                    onChange={() => toggleSymptom(symptom)}
                    style={{ cursor: "pointer" }}
                  />
                  <span style={{ fontSize: "14px" }}>{symptom}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Image & Voice Upload */}
          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>3. Upload Evidence</label>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              
              {/* Custom Image Upload Button */}
              <label style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                border: "2px dashed #9ca3af",
                borderRadius: "8px",
                backgroundColor: "#f9fafb",
                cursor: "pointer",
                textAlign: "center"
              }}>
                <UploadCloud color="#6b7280" size={32} style={{ marginBottom: "8px" }} />
                <span style={{ color: "#4b5563", fontWeight: "500" }}>
                  {imageName ? imageName : "Click to upload crop photo"}
                </span>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
              </label>

              {/* Voice Input Button */}
              <button 
                type="button"
                onClick={() => alert("Voice recording API will be integrated by backend team.")}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                  border: "1px solid #f59e0b",
                  borderRadius: "8px",
                  backgroundColor: "#fffbeb",
                  color: "#d97706",
                  cursor: "pointer",
                  fontWeight: "bold",
                  minWidth: "120px"
                }}
              >
                <Mic size={32} style={{ marginBottom: "8px" }} />
                Record Voice
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isAnalyzing}
            style={{
              backgroundColor: isAnalyzing ? "#4ade80" : "#166534",
              color: "white",
              padding: "16px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              fontSize: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              cursor: isAnalyzing ? "not-allowed" : "pointer",
              marginTop: "10px"
            }}
          >
            {isAnalyzing ? <><Loader2 size={20} className="animate-spin" /> Analyzing Crop...</> : "Run Diagnosis"}
          </button>
        </form>

        {/* DIAGNOSIS RESULT UI */}
        {diagnosis && (
          <div style={{
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
            animation: "fadeIn 0.5s ease-in-out"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", color: "#166534" }}>
              <CheckCircle2 size={28} />
              <h2 style={{ margin: 0 }}>Analysis Complete</h2>
            </div>
            
            <div style={{ marginBottom: "16px" }}>
              <p style={{ margin: "0 0 4px 0", color: "#4b5563" }}>Probable Issue:</p>
              <h3 style={{ margin: 0, color: "#b91c1c", fontSize: "22px" }}>{diagnosis.disease}</h3>
              <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#6b7280" }}>AI Confidence: {diagnosis.confidence}</p>
            </div>

            <div style={{ backgroundColor: "white", padding: "16px", borderRadius: "8px", borderLeft: "4px solid #f59e0b" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#d97706", fontWeight: "bold", marginBottom: "8px" }}>
                <AlertCircle size={20} />
                <span>Recommended Action</span>
              </div>
              <p style={{ margin: 0, color: "#374151", lineHeight: "1.5" }}>
                {diagnosis.action}
              </p>
            </div>
            <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "16px", textAlign: "center" }}>
              *This is preliminary guidance. Consult a local expert for severe cases.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportProblem;