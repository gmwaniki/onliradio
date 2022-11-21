import HistoryPage from '../../../components/History/HistoryPage';
import { getUrl } from '../../../util/getUrl';

export default async function Page() {
  const url = await getUrl();

  return <HistoryPage url={url} />;
}
