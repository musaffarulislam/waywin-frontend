import React, {FC} from 'react'
import { getClasses } from '../../utils/getClasses'
type IButtonInput = {
    children: string;
    type: string;
    varient: string;
  }


  const buttonTypes = {
    primary: "primary",
    secondary: "secondary",
  };

const LoginButton = ({ children, type, varient, ...rest }: IButtonInput) => {
  return (
    <button
    className={getClasses([

    ])}
    type={type === "submit" ? "submit" : "button"}
    {...rest}
  >
    {children}
  </button>
  )
}

export default LoginButton