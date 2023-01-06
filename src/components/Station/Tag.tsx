import React from "react";

type TagProp = {
  tag: string;
};
const Tag = ({ tag }: TagProp) => {
  return (
    <li className="text-CustomWhite bg-CustomBlack px-5 py-1 rounded-[20px] text-ellipsis overflow-hidden whitespace-nowrap">
      {tag}
    </li>
  );
};

export default Tag;
