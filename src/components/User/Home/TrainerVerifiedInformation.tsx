import React from 'react';
import { Link } from 'react-router-dom';

const TrainerVerifiedInformation = () => {
    return (
            <div className="flex flex-col items-start max-w-screen-sm md:flex-row sm:mx-auto">
                <a href="/" className="mb-4 mr-8">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-500">
                        <svg
                            className="w-12 h-12 text-deep-purple-accent-400"
                            stroke="currentColor"
                            viewBox="0 0 52 52"
                        >
                            <polygon
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                                points="29 13 14 29 25 29 23 39 38 23 27 23"
                            />
                        </svg>
                    </div>
                </a>
                <div>
                    <p className="mb-2 text-xs font-semibold tracking-wide uppercase">
                        Verified Trainers
                    </p>
                    <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none">
                        Trustworthy and Reliable Expert Trainers
                    </h2>
                    <p className="text-base text-gray-900 dark:text-indigo-200 md:text-md">
                        At our platform, we ensure that every trainer is a verified expert, providing you with trustworthy and reliable guidance.
                        Our verification process ensures that our trainers are qualified professionals with the expertise to assist you in various areas.
                        Feel confident in connecting with our expert trainers, knowing that you'll receive valuable advice and support for your personal or professional journey.
                    </p>
                    <Link to="/trainers" className="mt-4 inline-block px-6 py-3 text-sm font-semibold tracking-wider uppercase transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none">
                        Discover Trainers
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
    );
};

export default TrainerVerifiedInformation;
