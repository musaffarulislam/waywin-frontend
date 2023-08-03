import React from 'react'; 
import ChatInformation from './ChatInformation';
import TrainerVerifiedInformation from './TrainerVerifiedInformation';
import DateInformation from './DateInformation';
import OnlineOfflineInformation from './OnlineOfflineInformation';

const ExplainFeactures = () => {
    return (
        <div className="my-8 mt-16 px-4 text-2xl py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <TrainerVerifiedInformation />
                <ChatInformation />
                <DateInformation />
                <OnlineOfflineInformation />
            </div>
        </div>
    );
};

export default ExplainFeactures;
