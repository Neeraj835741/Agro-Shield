import { useEffect, useState } from "react";
import { getHealthReports } from "../services/historyService";
import { auth } from "../firebase"; // 👉 Added this import
import { onAuthStateChanged } from "firebase/auth"; // 👉 Added this import

function formatDate(value) {
  if (!value) return "Just now";

  if (typeof value.toDate === "function") {
    return value.toDate().toLocaleString();
  }

  return new Date(value).toLocaleString();
}

function HealthHistory() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null); // 👉 Added state to track logged-in user

  useEffect(() => {
    // 👉 1. Listen for who is logged in
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // 👉 2. If they are logged in, fetch ONLY their reports using their UID
        try {
          const savedReports = await getHealthReports(currentUser.uid);
          setReports(savedReports);
        } catch (error) {
          console.error(error);
          setErrorMessage("Unable to load crop health history.");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading crop health history...</p>;
  }

  // 👉 3. If no one is logged in, show this message instead of an error
  if (!user) {
    return (
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
        <h1 style={{ color: "#14532d" }}>Access Denied</h1>
        <p style={{ color: "#4b5563" }}>Please log in to view your private crop health history.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ color: "#14532d" }}>Crop Health History</h1>
      <p style={{ color: "#4b5563" }}>
        Review previously reported crop symptoms and diagnosis guidance.
      </p>

      {errorMessage && (
        <p style={{ color: "#b91c1c", fontWeight: "bold" }}>
          {errorMessage}
        </p>
      )}

      {reports.length === 0 ? (
        <div
          style={{
            marginTop: "24px",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #bbf7d0",
          }}
        >
          No crop health reports have been saved yet.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "16px",
            marginTop: "24px",
          }}
        >
          {reports.map((report) => (
            <article
              key={report.id}
              style={{
                backgroundColor: "white",
                border: "1px solid #d1d5db",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <h2 style={{ margin: 0, color: "#14532d" }}>
                  {report.crop || "Crop report"}
                </h2>

                <span style={{ color: "#6b7280", fontSize: "14px" }}>
                  {formatDate(report.createdAt)}
                </span>
              </div>

              <p>
                <strong>Possible issue:</strong>{" "}
                {report.diagnosis || "No clear match"}
              </p>

              <p>
                <strong>Symptoms:</strong>{" "}
                {report.symptoms?.join(", ") || "Not recorded"}
              </p>

              {report.severity && (
                <p>
                  <strong>Severity:</strong> {report.severity}
                </p>
              )}

              {report.treatment && (
                <p>
                  <strong>Treatment:</strong> {report.treatment}
                </p>
              )}

              {report.prevention && (
                <p>
                  <strong>Prevention:</strong> {report.prevention}
                </p>
              )}

              {report.safetyNote && (
                <p style={{ color: "#b45309" }}>
                  <strong>Safety note:</strong> {report.safetyNote}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default HealthHistory;