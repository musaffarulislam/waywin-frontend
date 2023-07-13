import React from 'react';
import bannerimage from "../../../assets/bannerimage.png";

const BannerUser = () => {

  return (
    <div className='p-16 pt-36 lg:pt-48 '>
      <div className='grid grid-cols-1 xl:grid-cols-5 px-6 sm:px-14 md:px-40 text-xl md:text-2xl  relative'>
        <div className='flex items-center justify-center xl:justify-start col-span-3 '>
          <div className='static xl:absolute'>
            <div className='text-4xl md:text-7xl font-medium flex justify-center xl:block'>There Are No </div>
            <div className='block lg:flex items-end mb-5 '>
              <div className="text-6xl md:text-8xl font-semibold text-sky-700 dark:text-yellow-300 md:me-7 flex justify-center">Shortcuts To</div>
              <div className='text-7xl md:text-9xl font-black text-red-500 flex justify-center '>Success</div>
            </div>
            <div className='text-lg md:text-2xl text-left xl:text-justify font-medium max-w-4xl mb-10  flex justify-center'>Proper guidance is crucial for success. It provides mentorship, expertise, and valuable insights. Learning from others' mistakes saves time and effort. Guidance expands networks and opportunities, accessing new collaborations.</div>
          </div>
        </div>
        <div className='col-span-2'>
          {/* <div
            className="min-h-[200px] md:min-h-[300px] xl:min-h-[500px] rounded-3xl bg-cover bg-center dark:shadow-2xl"
            style={{ backgroundImage: `url(${bannerimage})` }}
          ></div> */}
          <div className="" >
            <img src={bannerimage} alt='banner' />
          </div>
        </div>
      </div>

    </div>
  );
};

export default BannerUser;
