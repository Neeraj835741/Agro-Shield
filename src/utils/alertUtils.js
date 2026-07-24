import { alerts } from "../data/alerts";

export function getRelevantAlerts(crop = "All", season = "All") {
  return alerts.filter((alert) => {
    const cropMatches =
      crop === "All" ||
      alert.crops.includes(crop) ||
      alert.crops.includes("All");

    const seasonMatches =
      season === "All" ||
      alert.season === season ||
      alert.season === "All";

    return cropMatches && seasonMatches;
  });
}