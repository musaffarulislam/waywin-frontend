import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { addAuth, changeRole } from "../features/authSlice";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps): any | null {
  const location = useLocation();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const accessToken: string | null = useSelector((state: any) => state.auth.accessToken);
  const confirmObj: string | null = useSelector((state: any) => state.auth.confirmObj);
  const role: string | null = useSelector((state: any) => state.auth.role);
  
  if (!accessToken) {
    console.log("Login page navigate1")
    console.log(location.pathname)
    if(location.pathname === '/'){
      return <>{children}</>;
    }
    if (location.pathname !== "/signup" && location.pathname !== "/otp" && location.pathname !== "/login") {
      return <Navigate to="/login" />
    }
    console.log("Login page navigate2")
    console.log(location.pathname)
    if (location.pathname === "/otp") {
      if (confirmObj == null) {
        return <Navigate to="/signup" />
      }
    }
    console.log("Login page navigate3")
    console.log(location.pathname,"2")
    return <>{children}</>;
  }else if(accessToken && role){
    if (location.pathname === "/signup" || location.pathname === "/otp" || location.pathname === "/login") {
      return <Navigate to="/" />
    }
    if(role === "User"){
      if(location.pathname === "/trainer"){
        return <Navigate to="/" />
      }
    }else{
      if(location.pathname !== "/trainer"){
        return <Navigate to="/trainer" />
      }
    }
    return <>{children}</>;
  }else {
    dispatch(addAuth(null))
    dispatch(changeRole(null))
    return <Navigate to="/" />
  }
}
