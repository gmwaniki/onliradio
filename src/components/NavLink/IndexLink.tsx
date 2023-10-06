import React from "react";
import { HiOutlineHome } from "react-icons/hi";

import NavLink from "./NavLink";

export default function IndexLink() {
  return (
    <>
      <NavLink path={"/app"} className="">
        <HiOutlineHome className="text-3xl childPath:stroke-1 group-data-[active=true]:childPath:stroke-2" />

        <span className=" sm:group-data-[active=true]:bg-transparent sm:group-data-[active=true]:text-CustomWhite sm:px-0 sm:mx-0">
          Home
        </span>
      </NavLink>
    </>
  );
}
