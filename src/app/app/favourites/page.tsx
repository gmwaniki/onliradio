import FavouritesPage from '@/components/Favourites/FavouritesPage';
import { getUrl } from '@/util/getUrl';

export default async function Page() {
  const url = await getUrl();

  return (
    <section className='text-CustomWhite'>
      <h1 className='text-center font-semibold text-4xl mb-4'>Favourites</h1>
      <FavouritesPage url={url} />
    </section>
  );
}
