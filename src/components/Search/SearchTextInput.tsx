import React from 'react';
import { TInputValues } from '../../Context/SearchContext';

const SearchTextInput = ({
  name,
  value,
  setValue,
}: {
  name: string;
  value: TInputValues;
  setValue: React.Dispatch<React.SetStateAction<TInputValues>>;
}) => {
  return (
    <label className='relative '>
      <span className='text-CustomWhite capitalize'>{name}:</span>
      <input
        type='text'
        className=' w-full rounded-md p-4  text-CustomWhite bg-CustomLightGrey capitalize  placeholder:text-CustomWhite/502 placeholder:normal-case outline-none focus:ring-1 ring-CustomActivePurple  '
        placeholder={`Enter a ${name}`}
        onKeyUp={(e) => {
          e.stopPropagation();
        }}
        value={value[name]}
        onChange={(e) => {
          setValue({ ...value, [name]: e.currentTarget.value });
        }}
      />
    </label>
  );
};
export default SearchTextInput;
