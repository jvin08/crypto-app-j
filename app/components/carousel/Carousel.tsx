import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = {
  align: "start",
  dragFree: true,
  containScroll: "trimSnaps",
  loop: true,
};
const Carousel = () => {
  return (
    <div className="relative w-full sm:max-w-[400px] sm:mx-auto">
      <EmblaCarousel  options={OPTIONS} />
    </div>
  );
};
export default Carousel;
