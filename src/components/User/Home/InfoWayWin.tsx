import React from 'react'
import { Link } from 'react-router-dom';

const InfoWayWin = () => {
    return (
      <div className="my-8 px-4 text-2xl py-16  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
            <div className=' flex justify-center lg:justify-start'>
                <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-4xl">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-accent-400">
                    <svg className=" w-7 h-7" viewBox="0 0 24 24">
                        <polyline
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        points=" 8,5 8,1 16,1 16,5"
                        strokeLinejoin="round"
                        />
                        <polyline
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        points="9,15 1,15 1,5 23,5 23,15 15,15"
                        strokeLinejoin="round"
                        />
                        <polyline
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        points="22,18 22,23 2,23 2,18"
                        strokeLinejoin="round"
                        />
                        <rect
                        x="9"
                        y="13"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        width="6"
                        height="4"
                        strokeLinejoin="round"
                        />
                    </svg>
                    </div>
                    <div className="max-w-2xl mb-6">
                    <div >
                        <h2 className="max-w-8xl  mb-6 font-sans text-5xl font-bold tracking-tight  sm:text-7xl sm:leading-none">
                            Let's Book
                            <br className="hidden md:block" />
                            Your Own{' '}
                            <span className="inline-block text-deep-purple-accent-400">
                            Trainers
                            </span>
                        </h2>
                        <p className="text-xl  md:text-lg">
                            Whether you need professional counseling, guidance in your career path, or inspiration to achieve your goals, our expert trainers are here to support you on your journey to success.
                            Take control of your time and schedule a session with the trainer of your choice. Empower yourself with knowledge and motivation for personal and professional growth.
                        </p>
                    </div>
                    </div>
                    <div>
                    <div 
                        aria-label=""
                        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                    >
                        <Link to="/trainers">
                            more
                            <svg
                            className="inline-block w-3 ml-2"
                            fill="currentColor"
                            viewBox="0 0 12 12"
                            >
                            <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                            </svg>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center -mx-4 lg:pl-8">
                <div className="flex flex-col items-end px-3">
                    <img
                        className="object-cover mb-6 rounded shadow-lg h-72 sm:h-80 lg:h-96 w-h-72 sm:w-80 lg:w-96"
                        src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                        alt=""
                    />
                    <img
                        className="object-cover w-64 h-64 rounded shadow-lg sm:h-72 lg:h-80 sm:w-72 lg:w-80"
                        src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                        alt=""
                    />
                    </div>
                    <div className="px-3">
                    <img
                        className="object-cover w-40 h-40 rounded shadow-lg sm:h-80 lg:h-80 sm:w-80 lg:w-80"
                        src="https://images.pexels.com/photos/3182739/pexels-photo-3182739.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
                        alt=""
                    />
                </div>
            </div>
        </div>
      </div>
    );
  };


  export default InfoWayWin;