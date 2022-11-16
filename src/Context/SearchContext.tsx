import React, { createContext, useContext, useReducer } from 'react';

export type TCheckBoxes = {
  name: boolean;
  language: boolean;
  genre: boolean;
  country: boolean;
} & Record<string, boolean>;

export type TInputValues = {
  name?: string;
  language?: string;
  genre?: string;
  country?: string;
};

export type TSearch = {
  searchValues: TInputValues;
  filter: TCheckBoxes;
};

export enum TSearchReducerEnum {
  SEARCH = 'SEARCH',
}

const searchReducer: React.Reducer<
  TSearch,
  { type: TSearchReducerEnum; payload: TSearch }
> = (state, action) => {
  switch (action.type) {
    case TSearchReducerEnum.SEARCH: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const SearchContext = createContext<{
  state: TSearch;
  dispatch: React.Dispatch<{ type: TSearchReducerEnum; payload: TSearch }>;
}>({
  dispatch: () => {},
  state: {
    filter: {
      name: true,
      language: false,
      genre: false,
      country: false,
    },
    searchValues: {
      name: '',
      language: '',
      genre: '',
      country: '',
    },
  },
});
const SearchContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(searchReducer, {
    filter: {
      name: true,
      language: false,
      genre: false,
      country: false,
    },
    searchValues: {
      name: '',
      language: '',
      genre: '',
      country: '',
    },
  });

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
export default SearchContextProvider;
