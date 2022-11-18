export default function Loading() {
  return (
    <>
      <div className='h-32 bg-CustomLightBlack/70 pt-2 px-3 rounded animate-pulse'>
        <div className=' bg-CustomLightBlack/90 h-[55px] rounded mt-4'></div>
      </div>
      <div className='flex justify-between animate-pulse mt-4'>
        <div className='h-4 w-1/3 bg-CustomLightBlack/70 rounded'></div>
        <div className='h-4 w-1/6 bg-CustomLightBlack/70 rounded'></div>
      </div>
      <div className='mt-4 h-48 bg-CustomLightBlack/70 rounded animate-pulse'></div>
      <div className='flex justify-between animate-pulse mt-4'>
        <div className='h-4 w-1/3 bg-CustomLightBlack/70 rounded'></div>
        <div className='h-4 w-1/6 bg-CustomLightBlack/70 rounded'></div>
      </div>
      <div className='mt-4 animate-pulse flex gap-4 justify-between flex-wrap'>
        <div className='w-[150px] h-[160px] bg-CustomLightBlack/70 rounded'></div>
        <div className='w-[150px] h-[160px] bg-CustomLightBlack/70 rounded'></div>
        <div className='w-[150px] h-[160px] bg-CustomLightBlack/70 rounded'></div>
        <div className='w-[150px] h-[160px] bg-CustomLightBlack/70 rounded'></div>
        <div className='w-[150px] h-[160px] bg-CustomLightBlack/70 rounded'></div>
        <div className='w-[150px] h-[160px] bg-CustomLightBlack/70 rounded'></div>
      </div>
    </>
  );
}
