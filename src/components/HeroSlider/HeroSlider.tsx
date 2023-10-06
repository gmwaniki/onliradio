import React from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

type HeroSliderProps = {
  decrementIndex: () => void;
  incrementIndex: () => void;
  index: number;
};

const HeroSlider = ({
  index,
  decrementIndex,
  incrementIndex,
}: HeroSliderProps) => {
  return (
    <div className="flex justify-between items-center">
      <p className="font-medium text-lg">Top voted Stations</p>
      <span className="flex items-center ">
        <button
          type="button"
          aria-label="Previous"
          className="p-2 group"
          onClick={decrementIndex}
        >
          <HiOutlineChevronLeft className="text-3xl  group-active:opacity-50" />
        </button>
        <span className="text-CustomActive font-bold text-xl">{index + 1}</span>
        <button
          type="button"
          aria-label="Previous"
          className="p-2 group"
          onClick={incrementIndex}
        >
          <HiOutlineChevronRight className="text-3xl group-active:opacity-50" />
        </button>
      </span>
    </div>
  );
};

export default HeroSlider;
