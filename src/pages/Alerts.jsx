import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function Alerts() {
  const [season, setSeason] = useState("All");
  const { language } = useLanguage();

  const text = {
    en: {
      title: "Seasonal Crop Alerts",
      description:
        "Stay informed about common crop diseases and pest risks.",
      all: "All seasons",
      kharif: "Kharif",
      rabi: "Rabi",
      zaid: "Zaid",
      season: "season",
    },
    hi: {
      title: "मौसमी फसल अलर्ट",
      description: "सामान्य फसल रोगों और कीट जोखिमों की जानकारी पाएँ।",
      all: "सभी मौसम",
      kharif: "खरीफ",
      rabi: "रबी",
      zaid: "जायद",
      season: "मौसम",
    },
  };

  const t = text[language] || text.en;

  const alerts = [
    {
      season: "Kharif",
      crop: { en: "Rice", hi: "धान" },
      problem: {
        en: "Brown planthopper risk",
        hi: "ब्राउन प्लांटहॉपर का जोखिम",
      },
      advice: {
        en: "Check the lower part of rice plants regularly and avoid excessive nitrogen fertilizer.",
        hi: "धान के पौधों के निचले भाग की नियमित जाँच करें और नाइट्रोजन उर्वरक का अत्यधिक उपयोग न करें।",
      },
    },
    {
      season: "Kharif",
      crop: { en: "Cotton", hi: "कपास" },
      problem: {
        en: "Pink bollworm risk",
        hi: "गुलाबी सुंडी का जोखिम",
      },
      advice: {
        en: "Inspect flowers and bolls. Use pheromone traps and contact an expert if damage increases.",
        hi: "फूलों और टिंडों की जाँच करें। फेरोमोन ट्रैप का उपयोग करें और नुकसान बढ़ने पर विशेषज्ञ से संपर्क करें।",
      },
    },
    {
      season: "Rabi",
      crop: { en: "Wheat", hi: "गेहूँ" },
      problem: {
        en: "Yellow rust risk",
        hi: "पीला रतुआ रोग का जोखिम",
      },
      advice: {
        en: "Look for yellow stripes on leaves. Remove severely affected leaves and consult an expert.",
        hi: "पत्तियों पर पीली धारियों की जाँच करें। अधिक प्रभावित पत्तियों को हटाएँ और विशेषज्ञ से सलाह लें।",
      },
    },
    {
      season: "Rabi",
      crop: { en: "Potato", hi: "आलू" },
      problem: {
        en: "Late blight risk",
        hi: "लेट ब्लाइट रोग का जोखिम",
      },
      advice: {
        en: "Avoid excess moisture and check leaves for dark patches after cloudy or rainy weather.",
        hi: "अधिक नमी से बचें और बादल या बारिश के बाद पत्तियों पर काले धब्बों की जाँच करें।",
      },
    },
    {
      season: "Zaid",
      crop: { en: "Tomato", hi: "टमाटर" },
      problem: {
        en: "Whitefly risk",
        hi: "सफेद मक्खी का जोखिम",
      },
      advice: {
        en: "Inspect leaf undersides, remove badly affected leaves, and seek appropriate treatment guidance.",
        hi: "पत्तियों के नीचे की जाँच करें, अधिक प्रभावित पत्तियाँ हटाएँ और उचित उपचार की सलाह लें।",
      },
    },
  ];

  const visibleAlerts =
    season === "All"
      ? alerts
      : alerts.filter((alert) => alert.season === season);

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto" }}>
      <h1>{t.title}</h1>
      <p>{t.description}</p>

      <select
        value={season}
        onChange={(event) => setSeason(event.target.value)}
        style={{
          padding: "12px",
          marginTop: "18px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
        }}
      >
        <option value="All">{t.all}</option>
        <option value="Kharif">{t.kharif}</option>
        <option value="Rabi">{t.rabi}</option>
        <option value="Zaid">{t.zaid}</option>
      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "18px",
          marginTop: "25px",
        }}
      >
        {visibleAlerts.map((alert) => (
          <article
            key={`${alert.crop.en}-${alert.problem.en}`}
            style={{
              border: "1px solid #fed7aa",
              backgroundColor: "#fff7ed",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <p style={{ color: "#9a3412", fontWeight: "bold" }}>
              {alert.season === "Kharif"
                ? t.kharif
                : alert.season === "Rabi"
                  ? t.rabi
                  : t.zaid}{" "}
              {t.season}
            </p>

            <h2 style={{ margin: "8px 0" }}>{alert.crop[language]}</h2>
            <h3 style={{ color: "#b45309" }}>
              {alert.problem[language]}
            </h3>
            <p>{alert.advice[language]}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Alerts;