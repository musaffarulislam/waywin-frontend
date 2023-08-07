import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { addAuth, changeRole } from "../../app/slices/authSlice"; 

interface AuthProtectRouteProps {
  children: React.ReactNode;
}

export default function AuthProtectRoute({ children }: AuthProtectRouteProps): any | null {
  const location = useLocation();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const accessToken: string | null = window.localStorage.getItem("accessToken") 
  const role: string | null = useSelector((state: any) => state.auth.role);
  
  if (!accessToken) { 
    if(location.pathname === '/'){
      return <>{children}</>;
    }
    if (location.pathname !== "/signup" && location.pathname !== "/otp" && location.pathname !== "/login") {
      return <Navigate to="/login" />
    } 

    return <>{children}</>;
  }else if(accessToken && role){
    if (location.pathname === "/signup" || location.pathname === "/otp" || location.pathname === "/login") {
      return <Navigate to="/" />
    }
    if(role === "User"){
      if (role === "User" && location.pathname.startsWith("/trainer")) {
        return <Navigate to="/" />;
      }
    }else{
      if(!location.pathname.startsWith("/trainer")){
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
