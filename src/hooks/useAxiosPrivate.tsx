import { useEffect } from "react";
import { axiosPrivate } from "../config/axios";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const accessToken: string | null = window.localStorage.getItem("accessToken");

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: any) => {
        console.log("useAxios hook");
        if (!config.headers.Authorization) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (err: any) => Promise.reject(err)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response: any) => response,
      async (err : any) => {
        const prvsRequest = err?.config;
        if (err?.response?.status === 401 && !prvsRequest?.sent) {
          prvsRequest.sent = true;
          const { accessToken }: any = await refresh();
          prvsRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosPrivate(prvsRequest);
        }

        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
