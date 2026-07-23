export function getSoilHealth(phValue) {
  const ph = Number(phValue);

  if (Number.isNaN(ph) || ph <= 0 || ph > 14) {
    return {
      valid: false,
      status: "Unknown",
      message: "Please enter a valid soil pH value between 1 and 14.",
    };
  }

  if (ph < 6.5) {
    return {
      valid: true,
      status: "Acidic",
      message:
        "Your soil is acidic. Consider consulting a soil-testing centre for crop-specific improvement advice.",
    };
  }

  if (ph <= 7.5) {
    return {
      valid: true,
      status: "Suitable / Neutral",
      message:
        "Your soil pH is in a generally suitable range for many crops. Continue regular soil testing.",
    };
  }

  return {
    valid: true,
    status: "Alkaline",
    message:
      "Your soil is alkaline. Consult a soil-testing centre for crop-specific nutrient and soil-management advice.",
  };
}