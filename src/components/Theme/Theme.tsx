import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const Theme = () => {

      
  const theme: string = useSelector((state: any) => state.theme.theme);
  const element = document.documentElement 

  useEffect(() => {
    switch (theme) {
      case "dark" : 
          element.classList.add("dark")
          break;
      case "light":
          element.classList.remove("dark")
          break;
      default:
          break;
    }
  },[theme,element.classList])

  return (
    <></>
  )
}

export default Theme