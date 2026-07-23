import { useState } from "react";

function HealthHistory() {
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      id: 1,
      date: "15 July 2026",
      crop: "Rice",
      issue: "Yellow leaves",
      status: "Improving",
      advice: "Maintain proper drainage and monitor leaf color.",
    },
    {
      id: 2,
      date: "03 July 2026",
      crop: "Tomato",
      issue: "Whitefly symptoms",
      status: "Needs attention",
      advice: "Inspect leaf undersides and consult an expert for treatment.",
    },
    {
      id: 3,
      date: "20 June 2026",
      crop: "Cotton",
      issue: "Leaf spots",
      status: "Resolved",
      advice: "Remove affected leaves and keep the field clean.",
    },
  ];

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto" }}>
      <h1>Crop Health History</h1>
      <p>Review your previous crop problem reports and guidance.</p>

      <div style={{ display: "grid", gap: "16px", marginTop: "25px" }}>
        {reports.map((report) => (
          <article
            key={report.id}
            style={{
              border: "1px solid #A50021",
              borderRadius: "12px",
              padding: "20px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2
  style={{
    marginTop: 0,
    color: "#166534",
    fontWeight: "800",
    fontSize: "24px",
  }}
>
  {report.crop}
</h2>
                <p>
                  <strong>Reported issue:</strong> {report.issue}
                </p>
                <p>
                  <strong>Date:</strong> {report.date}
                </p>
              </div>

              <span
                style={{
                  height: "fit-content",
                  padding: "8px 12px",
                  borderRadius: "20px",
                  backgroundColor:
                    report.status === "Resolved" ? "#dcfce7" : "#fef3c7",
                  color: report.status === "Resolved" ? "#166534" : "#92400e",
                  fontWeight: "bold",
                }}
              >
                {report.status}
              </span>
            </div>

            <button
              onClick={() =>
                setSelectedReport(
                  selectedReport === report.id ? null : report.id
                )
              }
              style={{
                backgroundColor: "#166534",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "10px 14px",
                cursor: "pointer",
              }}
            >
              {selectedReport === report.id ? "Hide Details" : "View Details"}
            </button>

            {selectedReport === report.id && (
              <div
                style={{
                  marginTop: "15px",
                  padding: "15px",
                  backgroundColor: "#f0fdf4",
                  borderRadius: "8px",
                }}
              >
                <strong>Previous guidance:</strong>
                <p>{report.advice}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default HealthHistory;