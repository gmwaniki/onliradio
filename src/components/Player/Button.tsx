import React from "react";

type TButtonProps = {
  status: string;
  children: React.ReactNode;
  func: () => void;
};
const Button = ({ children, status, func }: TButtonProps) => {
  return (
    <button type="button" aria-label={status} onClick={func}>
      {children}
    </button>
  );
};

export default Button;
