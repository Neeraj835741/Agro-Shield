import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { saveFarmProfile, getFarmProfile } from "../services/farmService";
import { auth } from "../firebase";
import { useLanguage } from "../context/LanguageContext";

function FarmerProfile() {
  const { language, setLanguage, t } = useLanguage();

  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    farmerName: "",
    language,
    location: "",
    crop: "",
    sowingDate: "",
    soilPh: "",
  });

  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const existingData = await getFarmProfile();

          if (existingData && existingData.farmerName) {
            const savedLanguage =
              existingData.language === "Hindi" || existingData.language === "hi"
                ? "hi"
                : "en";

            setFormData({
              farmerName: existingData.farmerName || "",
              language: savedLanguage,
              location: existingData.location || "",
              crop: existingData.crop || "",
              sowingDate: existingData.sowingDate || "",
              soilPh: existingData.soilPh || "",
            });

            setLanguage(savedLanguage);
            setIsUpdating(true);
          }
        } catch (error) {
          console.error("Unable to load farm profile:", error);
        }
      }

      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, [setLanguage]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (name === "language") {
      setLanguage(value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!user) return;

    setStatus("loading");
    setMessage("");

    try {
      await saveFarmProfile(formData);

      setStatus("success");
      setMessage(
        isUpdating ? t("profileUpdated") : t("profileSaved")
      );
      setIsUpdating(true);
    } catch (error) {
      console.error("Firebase error:", error);
      setStatus("error");
      setMessage(t("profileSaveError"));
    }
  }

  if (loadingAuth) {
    return (
      <p style={{ padding: "20px", textAlign: "center" }}>
        {t("loadingProfile")}
      </p>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          maxWidth: "700px",
          margin: "50px auto",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#14532d" }}>{t("accessDenied")}</h1>
        <p style={{ color: "#4b5563" }}>{t("loginToEditProfile")}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ color: "#14532d" }}>
        {isUpdating ? t("updateFarmProfile") : t("myFarmProfile")}
      </h1>

      <p style={{ color: "#4b5563" }}>
        {isUpdating ? t("updateProfileDescription") : t("newProfileDescription")}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "16px",
          marginTop: "25px",
          padding: "24px",
          border: "1px solid #d1d5db",
          borderRadius: "12px",
          backgroundColor: "white",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            {t("farmerName")}
          </label>
          <input
            required
            name="farmerName"
            value={formData.farmerName}
            onChange={handleChange}
            placeholder={t("enterFullName")}
            style={{
              padding: "12px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            {t("preferredLanguage")}
          </label>
          <select
            required
            name="language"
            value={formData.language}
            onChange={handleChange}
            style={{
              padding: "12px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="en">{t("english")}</option>
            <option value="hi">{t("hindi")}</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            {t("stateDistrict")}
          </label>
          <input
            required
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder={t("locationExample")}
            style={{
              padding: "12px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            {t("crop")}
          </label>
          <input
            required
            name="crop"
            value={formData.crop}
            onChange={handleChange}
            placeholder={t("cropExample")}
            style={{
              padding: "12px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            {t("sowingDate")}
          </label>
          <input
            required
            type="date"
            name="sowingDate"
            value={formData.sowingDate}
            onChange={handleChange}
            style={{
              padding: "12px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            {t("soilPh")}
          </label>
          <input
            type="number"
            step="0.1"
            name="soilPh"
            value={formData.soilPh}
            onChange={handleChange}
            placeholder="e.g., 6.5"
            style={{
              padding: "12px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            backgroundColor: status === "loading" ? "#4ade80" : "#166534",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "14px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: status === "loading" ? "not-allowed" : "pointer",
            marginTop: "10px",
          }}
        >
          {status === "loading"
            ? t("saving")
            : isUpdating
              ? t("updateFarmProfile")
              : t("saveFarmProfile")}
        </button>

        {message && (
          <div
            style={{
              backgroundColor: status === "success" ? "#dcfce7" : "#fee2e2",
              color: status === "success" ? "#166534" : "#b91c1c",
              padding: "12px",
              borderRadius: "6px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default FarmerProfile;