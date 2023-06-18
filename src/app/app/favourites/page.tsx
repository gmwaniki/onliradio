import FavouritesPage from '../../../components/Favourites/FavouritesPage';
import { getUrl } from '../../../util/getUrl';

export default async function Page() {
  const url = await getUrl();

  return (
    <section className='text-CustomWhite'>
      <h1 className='text-center font-semibold text-4xl mb-4'>Favourites</h1>
      <ul className='grid grid-flow-row grid-cols-[repeat(auto-fit,150px)]  items-center justify-center  gap-y-4 gap-x-12 lg:grid-cols-[repeat(3,minmax(250px,1fr))]'>
        <FavouritesPage url={url} />
      </ul>
    </section>
  );
}
