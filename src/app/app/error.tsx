'use client';

import { useRouter } from 'next/navigation';

export default function Error() {
  const route = useRouter();
  return (
    <div className='text-white text-center mt-5'>
      <h2 className='text-2xl'>Something went wrong!</h2>
      <button
        className='bg-CustomLightBlack text-CustomActive p-4 rounded'
        onClick={() => route.replace('/app')}
      >
        Go home
      </button>
    </div>
  );
}
