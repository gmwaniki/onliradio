import FavouritesPage from '../../../components/Favourites/FavouritesPage';
import { getUrl } from '../../../util/getUrl';

export default async function Page() {
  const url = await getUrl();

  return <FavouritesPage url={url} />;
}
