"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { EmblaOptionsType } from "embla-carousel";
import Review from "./Review";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
  direction?: string;
};

const EmblaCarousel = (props: PropType) => {
  const { options, direction } = props;
  const [emblaRef] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true, stopOnInteraction: false, speed: 1 }),
  ]);

  return (
    <div className="embla z-0">
      <div
        className={`${
          direction === "left" ? "embla__viewport_1" : "embla__viewport_2"
        }`}
        ref={emblaRef}
      >
        <div className="embla__container">
          <div className="embla__slide">
            <Review />
          </div>
          <div className="embla__slide">
            <Review />
          </div>
          <div className="embla__slide">
            <Review />
          </div>
          <div className="embla__slide">
            <Review />
          </div>
          <div className="embla__slide">
            <Review />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
