import React from 'react';

type SpinnerProps = {
  className?: string;
  message?: string;
};
const Spinner = ({ className, message }: SpinnerProps) => {
  return (
    <div className={`p-4 flex flex-col items-center  gap-y-4 ${className}`}>
      <div className='h-10 w-10 border-4 border-y-CustomActivePurple border-x-transparent rounded-full animate-spin '></div>
      <p>{message}</p>
    </div>
  );
};
export default Spinner;
