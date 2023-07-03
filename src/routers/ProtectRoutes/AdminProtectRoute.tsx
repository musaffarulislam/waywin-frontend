import {  useLocation, Navigate } from "react-router-dom";

interface AdminProtectRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectRoute({ children }: AdminProtectRouteProps): any | null {

  const location = useLocation();

  const accessToken: string | null = window.localStorage.getItem("accessTokenAdmin");
  // const confirmObj: string | null = useSelector((state: any) => state.auth.confirmObj);
  
  if (!accessToken) {
    if (location.pathname !== "/admin/login") {
      return <Navigate to="/admin/login" />
    }
    return <>{children}</>
  }else{
    if (location.pathname === "/admin/login") {
      return <Navigate to="/admin" />
    }
    return <>{children}</>;
  }
}
