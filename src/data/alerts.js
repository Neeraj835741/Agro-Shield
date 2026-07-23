export const alerts = [
  {
    id: "kharif-fungal-risk",
    title: "High humidity can increase fungal disease risk",
    titleHi: "अधिक नमी से फंगल रोग का खतरा बढ़ सकता है",
    season: "Kharif",
    level: "High",
    crops: ["Rice", "Tomato", "Cotton"],
    message:
      "Inspect leaves for spots, avoid excess watering, and remove heavily infected plant parts.",
    messageHi:
      "पत्तियों पर धब्बों की जाँच करें, अधिक पानी देने से बचें और बहुत संक्रमित पौधों के हिस्से हटा दें।",
  },
  {
    id: "whitefly-risk",
    title: "Whitefly activity alert",
    titleHi: "सफेद मक्खी का प्रकोप चेतावनी",
    season: "Kharif",
    level: "Medium",
    crops: ["Cotton", "Tomato"],
    message:
      "Check the underside of leaves for small white insects. Use yellow sticky traps and keep fields weed-free.",
    messageHi:
      "पत्तियों के नीचे छोटी सफेद मक्खियों की जाँच करें। पीले स्टिकी ट्रैप का उपयोग करें और खेत को खरपतवार मुक्त रखें।",
  },
  {
    id: "wheat-rust-risk",
    title: "Wheat rust monitoring alert",
    titleHi: "गेहूं रतुआ निगरानी चेतावनी",
    season: "Rabi",
    level: "Medium",
    crops: ["Wheat"],
    message:
      "Look for yellow or orange powder-like spots on leaves and contact an agriculture officer if they spread.",
    messageHi:
      "पत्तियों पर पीले या नारंगी पाउडर जैसे धब्बों की जाँच करें और फैलने पर कृषि अधिकारी से संपर्क करें।",
  },
  {
    id: "heavy-rain-warning",
    title: "Heavy rain may cause waterlogging",
    titleHi: "भारी बारिश से जलभराव हो सकता है",
    season: "All",
    level: "High",
    crops: ["Rice", "Wheat", "Cotton", "Tomato", "Potato"],
    message:
      "Ensure field drainage and inspect crops after rain for fungal disease symptoms.",
    messageHi:
      "खेत में पानी निकासी की व्यवस्था करें और बारिश के बाद फंगल रोग के लक्षणों की जाँच करें।",
  },
];