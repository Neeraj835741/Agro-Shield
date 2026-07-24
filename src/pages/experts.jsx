import { useEffect, useState } from "react";
import {
  MapPin,
  Star,
  Store,
  Navigation,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function Experts() {
  const { t } = useLanguage();

  const [supportList, setSupportList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorKey, setErrorKey] = useState("");

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

    if (!navigator.geolocation) {
      setErrorKey("geoUnsupported");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://api.geoapify.com/v2/places?categories=commercial.agrarian,commercial.garden,commercial&filter=circle:${lon},${lat},20000&bias=proximity:${lon},${lat}&limit=50&apiKey=${apiKey}`
          );

          if (!response.ok) {
            throw new Error("Unable to load places");
          }

          const data = await response.json();

          const farmingKeywords = [
            "agro",
            "krishi",
            "kisan",
            "farm",
            "fertilizer",
            "seed",
            "tractor",
            "nursery",
            "plant",
            "agriculture",
          ];

          let liveShops = [];

          if (data.features) {
            const mappedShops = data.features.map((place, index) => ({
              id: `shop_${index}`,
              type: "shop",
              name: place.properties.name || "Nearby farm shop",
              specialtyKey: "farmingSupplies",
              rating: "4.5",
              address:
                place.properties.address_line2 ||
                place.properties.street ||
                "Nearby Location",
              mapUrl: `https://www.google.com/maps/dir/?api=1&destination=${place.properties.lat},${place.properties.lon}`,
            }));

            liveShops = mappedShops.filter((shop) => {
              const lowerName = shop.name.toLowerCase();

              return farmingKeywords.some((keyword) =>
                lowerName.includes(keyword)
              );
            });
          }

          const localExperts = [
            {
              id: "expert_1",
              type: "expert",
              name: "Dr. Vikram Sharma",
              specialtyKey: "agronomistSpecialist",
              rating: "4.9",
              addressKey: "availablePhoneVisit",
              mapUrl: "tel:+919876543210",
            },
            {
              id: "expert_2",
              type: "expert",
              name: "Anita Desai",
              specialtyKey: "plantPathologyExpert",
              rating: "4.8",
              addressKey: "availablePhoneVisit",
              mapUrl: "tel:+917654321098",
            },
          ];

          const combinedList = [...localExperts, ...liveShops];

          if (combinedList.length === 2) {
            combinedList.push({
              id: "shop_fallback",
              type: "shop",
              name: "Local Krishi Seva Kendra",
              specialtyKey: "farmingSupplies",
              rating: "4.3",
              addressKey: "checkMapsRoute",
              mapUrl:
                "https://www.google.com/maps/search/fertilizer+shop+near+me",
            });
          }

          setSupportList(combinedList);
        } catch (error) {
          console.error("Nearby support error:", error);
          setErrorKey("nearbySupportError");
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        setErrorKey("allowLocation");
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ color: "#14532d", margin: "0 0 8px 0" }}>
          {t("supportTitle")}
        </h1>

        <p style={{ color: "#4b5563", margin: 0 }}>
          {t("supportDescription")}
        </p>
      </div>

      {isLoading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 20px",
            color: "#166534",
          }}
        >
          <Loader2
            className="animate-spin"
            size={48}
            style={{ marginBottom: "16px" }}
          />
          <p style={{ fontWeight: "bold", fontSize: "18px" }}>
            {t("locatingGps")}
          </p>
        </div>
      )}

      {errorKey && (
        <div
          style={{
            backgroundColor: "#fef2f2",
            color: "#b91c1c",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #fca5a5",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: "bold",
          }}
        >
          <AlertCircle size={24} />
          {t(errorKey)}
        </div>
      )}

      {!isLoading && !errorKey && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {supportList.map((shop) => (
            <div
              key={shop.id}
              style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#fef3c7",
                    padding: "12px",
                    borderRadius: "8px",
                    color: "#d97706",
                  }}
                >
                  <Store size={24} />
                </div>

                <div>
                  <h3
                    style={{
                      margin: "0 0 4px 0",
                      color: "#1f2937",
                      fontSize: "18px",
                    }}
                  >
                    {shop.name}
                  </h3>

                  <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
                    {t(shop.specialtyKey)}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "20px",
                  color: "#4b5563",
                  fontSize: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Star size={16} color="#eab308" fill="#eab308" />
                  <span style={{ fontWeight: "bold" }}>{shop.rating}</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <MapPin
                    size={16}
                    color="#6b7280"
                    style={{ minWidth: "16px" }}
                  />
                  <span>
                    {shop.addressKey ? t(shop.addressKey) : shop.address}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
                <a
                  href={shop.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px",
                    backgroundColor: "#166534",
                    color: "white",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  <Navigation size={18} />
                  {t("getDirections")}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Experts;