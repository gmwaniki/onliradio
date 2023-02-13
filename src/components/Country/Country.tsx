import Link from "next/link";
import React from "react";
import { HiOutlineChevronRight } from "react-icons/hi";

import { TCountry } from "../../app/app/countries/page";
import getFlagEmoji from "../../util/getFlagEmoji";

type TCountryProps = {
  country: TCountry;
};

const Country = (prop: TCountryProps) => {
  const { country } = prop;
  return (
    <li className="sm:aspect-[2/.5] 2xl:aspect-[4/2]">
      <Link
        href={`/app/search/country/${country.iso_3166_1}`}
        className="flex justify-between items-center pr-4 pl-2 py-2 mb-4 rounded bg-CustomLightBlack/50  relative isolate sm:mb-0 h-full"
      >
        <div className=" flex flex-col ">
          <p>
            {country.name}
            {getFlagEmoji(country.iso_3166_1) || ""}
          </p>
        </div>
        <HiOutlineChevronRight className="text-7xl childPath:stroke-1" />
        <span className="absolute -z-10 top-1/2 -translate-y-1/2 right-0 blur-lg text-7xl">
          {getFlagEmoji(country.iso_3166_1) || ""}
        </span>
      </Link>
    </li>
  );
};

export default Country;
