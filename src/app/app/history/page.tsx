import HistoryStations from '../../../components/History/HistoryPage';
import { getUrl } from '../../../util/getUrl';

export default async function Page() {
  const url = await getUrl();

  return (
    <section className='text-CustomWhite'>
      <h2 className='text-4xl font-bold text-center mb-4'>History</h2>
      <HistoryStations url={url} />
    </section>
  );
}
