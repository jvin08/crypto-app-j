export const color = (number: number) => {
  const colors = [
    "bg-cryptodark-650",
    "bg-cryptodark-660",
    "bg-cryptodark-670",
    "bg-cryptodark-680",
    "bg-cryptodark-690",
  ];
  if (number >= 75) return colors[4];
  if (number >= 55) return colors[3];
  if (number >= 48) return colors[2];
  if (number >= 25) return colors[1];
  return colors[0];
};
export const toolTipInfo = (number: number) => {
  const info = {
    extremeFear: "Panic selling, potential buying opportunities. Extreme fear.",
    fear: "Cautious market, possible correction phase. Fear.",
    neutral: "Balanced sentiment, stable prices. Neutral.",
    greed: "Optimism, rising prices, potential overvaluation. Greed.",
    extremeGreed: "High optimism, risk of bubbles, caution advised. Extreme greed."
  };
  if (number >= 75) return info.extremeGreed;
  if (number >= 55) return info.greed;
  if (number >= 48) return info.neutral;
  if (number >= 25) return info.fear;
  return info.extremeFear;
};
export const calculateHoursLeft = (hours:number) => {
  const adjustHours = 18 - hours < 0 ? 18 - hours + 24 : 18 - hours;
  return adjustHours < 10 ? "0" + adjustHours : adjustHours;
};