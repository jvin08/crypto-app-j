import React from "react";
import dynamic from "next/dynamic";

const GaugeComponent = dynamic(() => import("react-gauge-component"), { ssr: false });
const Gauge = ({greedIndex}:{greedIndex:any}) => {
  return (
    <GaugeComponent
      type="radial"
      arc={{
        width: 0.15,
        padding: 0.0015,
        cornerRadius: 7,
        // gradient: true,
        subArcs: [
          {
            limit: 24,
            color: "#ea8228",
            showTick: false,
            tooltip: {
              text: "Extreme Fear!",
              style: { color: "red", zIndex: 1000}
            },
          },
          {
            limit: 47,
            color: "#efb421",
            showTick: false,
            tooltip: {
              text: "Fear!"
            }
          },
          {
            limit: 55,
            color: "#f3d51b",
            showTick: false,
            tooltip: {
              text: "Neutral!"
            }
          },
          {
            limit: 75, color: "#99e225", showTick: false,
            tooltip: {
              text: "Greed!"
            }
          },
          {
            color: "#5BE12C",
            tooltip: {
              text: "Extreme greed!"
            }
          }
        ]
      }}
      pointer={{
        color: "brown",
        length: 1,
        width: 10,
        elastic: true,
      }}
      labels={{
        valueLabel: { formatTextValue: value => value + " " },
        tickLabels: {
          hideMinMax: true,
          // valueConfig: { formatTextValue: value => value + " ", fontSize: 10 },
          // ticks: [
          //   { value: greedIndex },
          // ],
        }
      }}
      value={greedIndex}
      minValue={0}
      maxValue={100}
    />
  );
};
export default Gauge;