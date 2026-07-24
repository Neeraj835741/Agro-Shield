import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function CropCalendar() {
  const { t } = useLanguage();

  const [crop, setCrop] = useState("");
  const [sowingDate, setSowingDate] = useState("");
  const [seasonKey, setSeasonKey] = useState("");

  function findSeason() {
    if (!sowingDate) {
      setSeasonKey("selectSowingDateError");
      return;
    }

    const month = new Date(`${sowingDate}T00:00:00`).getMonth() + 1;

    if (month >= 6 && month <= 10) {
      setSeasonKey("kharifSeason");
    } else if (month === 4 || month === 5) {
      setSeasonKey("zaidSeason");
    } else {
      setSeasonKey("rabiSeason");
    }
  }

  const crops = [
    { value: "Rice", label: "rice" },
    { value: "Wheat", label: "wheat" },
    { value: "Maize", label: "maize" },
    { value: "Cotton", label: "cotton" },
    { value: "Tomato", label: "tomato" },
    { value: "Potato", label: "potato" },
  ];

  const selectedCrop = crops.find((item) => item.value === crop);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h1>{t("calendarTitle")}</h1>
      <p>{t("calendarDescription")}</p>

      <div
        style={{
          marginTop: "25px",
          padding: "24px",
          border: "1px solid #d1d5db",
          borderRadius: "12px",
          display: "grid",
          gap: "16px",
        }}
      >
        <select
          value={crop}
          onChange={(event) => setCrop(event.target.value)}
          style={{ padding: "12px" }}
        >
          <option value="">{t("selectCrop")}</option>

          {crops.map((item) => (
            <option key={item.value} value={item.value}>
              {t(item.label)}
            </option>
          ))}
        </select>

        <label>
          {t("sowingDate")}
          <input
            type="date"
            value={sowingDate}
            onChange={(event) => setSowingDate(event.target.value)}
            style={{ padding: "12px", display: "block", marginTop: "6px" }}
          />
        </label>

        <button
          onClick={findSeason}
          style={{
            backgroundColor: "#166534",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {t("identifySeason")}
        </button>

        {seasonKey && (
          <div
            style={{
              backgroundColor: "#dcfce7",
              color: "#166534",
              padding: "16px",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            {selectedCrop && (
              <p>
                {t("selectedCrop")} {t(selectedCrop.label)}
              </p>
            )}

            <p>{t(seasonKey)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropCalendar;