import React from 'react'

const SpecialFeatureCard = ({children}: { children: React.ReactNode }) => {

  return (
    <div className="h-32 min-h-16 bg-indigo-950 dark:bg-white  rounded-2xl text-2xl flex items-center justify-center px-16 py-32 mb-10 relative overflow-hidden">
            <div className="z-10 text-slate-50 dark:text-primary_dark ">
                {children}
            </div>
        <div className="absolute -right-24 -top-6 w-48 h-48 md:w-72 md:h-72 bg-red-500 dark:bg-blue-200 rounded-full hover:-right-12 duration-75"></div>
    </div>
  )
}

export default SpecialFeatureCard