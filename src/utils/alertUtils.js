import { alerts } from "../data/alerts";

export function getRelevantAlerts(crop, season) {
  return alerts.filter((alert) => {
    const cropMatches =
      alert.crops.includes(crop) || alert.crops.includes("All");

    const seasonMatches =
      alert.season === season || alert.season === "All";

    return cropMatches && seasonMatches;
  });
}