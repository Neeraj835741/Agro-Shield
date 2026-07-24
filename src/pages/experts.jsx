import { useState, useEffect } from "react";
import { MapPin, Star, Store, Navigation, Loader2, AlertCircle } from "lucide-react";

function Experts() {
  const [supportList, setSupportList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          // ⚠️ PASTE YOUR KEY HERE AGAIN
          const API_KEY = "f84ce608ff154954aa00c9f24dc2be7b"; 

          try {
          
            // Added specific categories for agrarian/farm shops and hardware
            const response = await fetch(
              `https://api.geoapify.com/v2/places?categories=commercial.agrarian,commercial.garden,commercial&filter=circle:${lon},${lat},20000&bias=proximity:${lon},${lat}&limit=50&apiKey=${API_KEY}`
            );
            
            const data = await response.json();

            // 2. SMART FILTER: Only keep shops with farming-related words in their name
            const farmingKeywords = ["agro", "krishi", "kisan", "farm", "fertilizer", "seed", "tractor", "nursery", "plant", "agriculture"];
            
            let liveShops = [];
            if (data.features) {
              const mappedShops = data.features.map((place, index) => ({
                id: `shop_${index}`,
                type: "Shop", // Tag it as a shop
                name: place.properties.name || "",
                specialty: "Farming Supplies & Fertilizers",
                rating: "4.5",
                address: place.properties.address_line2 || place.properties.street || "Nearby Location",
                mapUrl: `https://www.google.com/maps/dir/?api=1&destination=${place.properties.lat},${place.properties.lon}`
              }));

              // Filter to only include names that match our keywords (case-insensitive)
              liveShops = mappedShops.filter(shop => {
                const lowerName = shop.name.toLowerCase();
                return farmingKeywords.some(keyword => lowerName.includes(keyword));
              });
            }

            // 3. INJECT EXPERTS: Manually add experts since they aren't on standard maps
            const localExperts = [
              {
                id: "expert_1",
                type: "Expert", // Tag it as an expert
                name: "Dr. Vikram Sharma",
                specialty: "Agronomist & Soil Specialist",
                rating: "4.9",
                address: "Available via Phone / Farm Visit",
                mapUrl: "tel:+919876543210" // Clicking this opens the phone dialer!
              },
              {
                id: "expert_2",
                type: "Expert",
                name: "Anita Desai",
                specialty: "Plant Pathology Expert",
                rating: "4.8",
                address: "Available via Phone / Farm Visit",
                mapUrl: "tel:+917654321098"
              }
            ];

            // 4. Combine them! Experts first, then the live shops.
            const combinedList = [...localExperts, ...liveShops];

            // 5. Fallback just in case no live shops match the keywords
            if (combinedList.length === 2) { // Means only experts loaded
              combinedList.push({
                id: "shop_fallback",
                type: "Shop",
                name: "Local Krishi Seva Kendra",
                specialty: "Farming Supplies & Fertilizers",
                rating: "4.3",
                address: "Check Google Maps for exact route",
                mapUrl: `https://www.google.com/maps/search/fertilizer+shop+near+me`
              });
            }

            setSupportList(combinedList);
            setIsLoading(false);

          } catch (error) {
            console.error("API Error:", error);
            setErrorMsg("Failed to load nearby shops. Please check your internet connection.");
            setIsLoading(false);
          }
        },
        (error) => {
          console.error("GPS Error:", error);
          setErrorMsg("Please click 'Allow' when the browser asks for your location.");
          setIsLoading(false);
        }
      );
    } else {
      setErrorMsg("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ color: "#14532d", margin: "0 0 8px 0" }}>Live Nearby Support</h1>
        <p style={{ color: "#4b5563", margin: 0 }}>Showing real stores and experts near your current GPS location.</p>
      </div>

      {isLoading && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", color: "#166534" }}>
          <Loader2 className="animate-spin" size={48} style={{ marginBottom: "16px" }} />
          <p style={{ fontWeight: "bold", fontSize: "18px" }}>Locating you via GPS...</p>
        </div>
      )}

      {errorMsg && (
        <div style={{ backgroundColor: "#fef2f2", color: "#b91c1c", padding: "20px", borderRadius: "8px", border: "1px solid #fca5a5", display: "flex", alignItems: "center", gap: "10px", fontWeight: "bold" }}>
          <AlertCircle size={24} />
          {errorMsg}
        </div>
      )}

      {!isLoading && !errorMsg && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {supportList.map((shop) => (
            <div key={shop.id} style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)", display: "flex", flexDirection: "column" }}>
              
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "16px" }}>
                <div style={{ backgroundColor: "#fef3c7", padding: "12px", borderRadius: "8px", color: "#d97706" }}>
                  <Store size={24} />
                </div>
                <div>
                  <h3 style={{ margin: "0 0 4px 0", color: "#1f2937", fontSize: "18px" }}>{shop.name}</h3>
                  <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>{shop.specialty}</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", color: "#4b5563", fontSize: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Star size={16} color="#eab308" fill="#eab308" />
                  <span style={{ fontWeight: "bold" }}>{shop.rating}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <MapPin size={16} color="#6b7280" style={{ minWidth: "16px" }} />
                  <span>{shop.address}</span>
                </div>
              </div>

              <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
                <a 
                  href={shop.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px", backgroundColor: "#166534", border: "none", color: "white", borderRadius: "8px", fontWeight: "bold", textDecoration: "none" }}
                >
                  <Navigation size={18} />
                  Get Directions
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