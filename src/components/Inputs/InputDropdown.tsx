import React from 'react'

export const InputDropdown = ({children}: any) => {
  return (
    <div className="block px-4 py-2 text-2xl text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" >
        {children}
    </div>
  )
}
