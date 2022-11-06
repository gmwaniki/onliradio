import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { ReactElement, useContext } from 'react';
import AppLayout from '../../components/Layout/AppLayout';
import Spinner from '../../components/Spinner/Spinner';
import StationCard from '../../components/Station/StationCard';
import { StationContext } from '../../Context/AudioContext';
import { SearchContext } from '../../Context/SearchContext';
import useGetStations from '../../hooks/useGetStations';
import { getStationsUrl } from '../../util/getStationsUrl';
import { getRadioServerUrl } from '../../util/getUrl';
import { TStation } from '../../util/playableStation';
import { NextPageWithLayout } from '../_app';

const SearchPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ url }) => {
  const { state } = useContext(SearchContext);
  const { state: currentStation } = useContext(StationContext);
  const { station: current } = currentStation;
  const fullUrl = getStationsUrl(url, state.searchValues, state.filter);
  const { isError, isLoading, data } = useGetStations(fullUrl);

  if (isError) {
    return (
      <div className='text-CustomWhite text-center'>An error Occurred</div>
    );
  }
  if (isLoading) {
    return <Spinner message='Loading ...' className='text-CustomWhite' />;
  }

  return (
    <div className='text-CustomTextGrey grid grid-cols-[repeat(auto-fit,minmax(0,316px))] grid-flow-row gap-4 justify-center mt-4 max-w-[1560px]'>
      {data.length > 0 ? (
        data.map((station) => {
          return (
            <StationCard
              station={station}
              key={station.stationuuid}
              isPlaying={station.stationuuid === current.stationId}
            />
          );
        })
      ) : (
        <div className='text-center text-CustomWhite'>No result found</div>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  url: string;
}> = async () => {
  try {
    const url = await getRadioServerUrl();
    return {
      props: {
        url,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
export default SearchPage;
