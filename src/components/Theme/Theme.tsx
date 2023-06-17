import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const Theme = () => {

      
  const theme: string = useSelector((state: any) => state.theme.theme);
  const element = document.documentElement
  const options = [
    {
      text: "light",
    },
    {
      text: "dark",
    },
    {
      text: "system",
    }
  ]

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
  },[theme])

  return (
    <></>
  )
}

export default Theme