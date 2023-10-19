import HistoryStations from '../../../components/History/HistoryPage';
import { getUrl } from '../../../util/getUrl';

export default async function Page() {
  const url = await getUrl();

  return (
    <section className='text-CustomWhite'>
      <h2 className='text-4xl font-bold text-center'>History</h2>
      <ul className='grid grid-flow-row grid-cols-[repeat(auto-fit,150px)]  items-center justify-center  gap-y-4 gap-x-12 '>
        <HistoryStations url={url} />
      </ul>
    </section>
  );
}
