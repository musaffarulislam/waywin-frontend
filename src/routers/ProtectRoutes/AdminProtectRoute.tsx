import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { addAuth, changeRole } from "../../app/slices/authSlice";

interface AdminProtectRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectRoute({ children }: AdminProtectRouteProps): any | null {
  // const location = useLocation();
  // const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const accessToken: string | null = window.localStorage.getItem("accessTokenAdmin");
  // const confirmObj: string | null = useSelector((state: any) => state.auth.confirmObj);
  
  if (!accessToken) {
    return <Navigate to="/login" />
  }else{
    return <>{children}</>;
  }
}
