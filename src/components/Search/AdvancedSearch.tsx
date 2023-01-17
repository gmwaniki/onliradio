"use client";
import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

type TProps = {
  name?: string;
  genre?: string;
  country?: string;
  language?: string;
  submit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
};

export default function AdvancedSearch({ submit }: TProps) {
  return (
    <div className="bg-CustomLightBlack rounded sticky top-1 z-10">
      <form
        className="grid grid-flow-col grid-cols-1 px-3 pt-2 "
        onSubmit={(e) => {
          e.preventDefault();
          // const formData = new FormData(e.currentTarget);
          // console.log(Object.fromEntries(formData.entries()));
          // for (const iterator of formData.entries()) {
          //   console.log(iterator);
          // }
          submit(e);
        }}
      >
        <label
          htmlFor="name"
          className="text-CustomWhite font-medium col-span-2 row-start-1 col-start-1"
        >
          Station Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          className="w-full py-3 pl-2 rounded-l text-lg text-white bg-[#6C6C6C] focus:outline-none focus:ring-2 focus:ring-CustomActive  focus:ring-inset row-start-2 "
        />

        <details className="row-start-3 col-span-2 open:pb-3">
          <summary className="py-2">Advanced Filters</summary>
          <div>
            <label
              htmlFor="genre"
              className="text-CustomWhite font-medium col-span-2"
            >
              Genre:
            </label>
            <input
              type="text"
              name="genre"
              id="genre"
              placeholder="Genre"
              className="w-full py-3 pl-2 rounded text-lg text-white bg-[#6C6C6C] focus:outline-none focus:ring-2 focus:ring-CustomActive  focus:ring-inset "
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="text-CustomWhite font-medium col-span-2"
            >
              Country:
            </label>
            <input
              type="text"
              name="country"
              id="country"
              placeholder="Country"
              className="w-full py-3 pl-2 rounded text-lg text-white bg-[#6C6C6C] focus:outline-none focus:ring-2 focus:ring-CustomActive  focus:ring-inset "
            />
          </div>
          <div>
            <label
              htmlFor="language"
              className="text-CustomWhite font-medium col-span-2"
            >
              Language:
            </label>
            <input
              type="text"
              name="language"
              id="language"
              placeholder="Language"
              className="w-full py-3 pl-2 rounded text-lg text-white bg-[#6C6C6C] focus:outline-none focus:ring-2 focus:ring-CustomActive  focus:ring-inset "
            />
          </div>
        </details>
        <button
          type="submit"
          aria-label="Search"
          className="bg-CustomActive rounded-r w-12  flex justify-center items-center col-start-2 sm:w-auto sm:px-2"
        >
          <HiOutlineSearch className="text-3xl text-CustomWhite" />
          <span className="hidden sm:inline font-semibold">Search</span>
        </button>
      </form>
    </div>
  );
}
