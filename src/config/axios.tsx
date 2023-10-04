import axios from "axios";

const BASE_URL = "https://waywin.server.musaffar.com/api";
const BASE_URL_ADMIN = "https://waywin.server.musaffar.com/api/admin";
// const BASE_URL = "http://localhost:4000/api";
// const BASE_URL_ADMIN = "http://localhost:4000/api/admin";

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL_ADMIN,
});


async function refresh() {
  try{
    const refreshToken = window.localStorage.getItem('refreshToken') as string;
    const response = await axiosPublic.post("/auth/token", {refreshToken: JSON.parse(refreshToken)})
    const {accessToken} = response.data
    window.localStorage.setItem('accessToken',JSON.stringify(accessToken))
    return { accessToken };
  }catch(error){ 
    console.log("Error during logout:", error);
    window.localStorage.removeItem("accessToken")
    window.localStorage.removeItem("refreshToken")
    throw error;
  }
}


axiosPublic.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const accessToken = window.localStorage.getItem('accessToken') as string;
      config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);


axiosPublic.interceptors.response.use(
  (response) => response,
  async (err) => {
    const prvsRequest = err?.config;
    if (err?.response?.status === 401 && !prvsRequest?.sent) {
      prvsRequest.sent = true;
      try{
        const access = window.localStorage.getItem("accessToken")
        const refersh = window.localStorage.getItem("refreshToken")
        console.log("Access : ",access)
        console.log("refresh : ",refersh)

        const { accessToken } = await refresh();
        prvsRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosPublic(prvsRequest);
      }catch(error){
        console.log("Error refreshing token:", error)
        throw error
      }
    }
    return Promise.reject(err);
  }
);

export default axiosPublic ;


async function refreshAdmin() {
  try{
    const refreshToken = window.localStorage.getItem('refreshTokenAdmin') as string;
    const response = await axiosPublic.post("/auth/token", {refreshToken: JSON.parse(refreshToken)})
    const {accessToken} = response.data
    window.localStorage.setItem('accessTokenAdmin',JSON.stringify(accessToken))
    return { accessToken };
  }catch(error){
    console.error("Error during logout:", error);
    window.localStorage.removeItem("accessTokenAdmin")
    window.localStorage.removeItem("refreshTokenAdmin")
    throw error;
  }
}


axiosPrivate.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const accessToken = window.localStorage.getItem('accessTokenAdmin') as string;
      config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);


axiosPrivate.interceptors.response.use(
  (response) => response,
  async (err) => {
    const prvsRequest = err?.config;
    if (err?.response?.status === 401 && !prvsRequest?.sent) {
      prvsRequest.sent = true;
      try{
        const { accessToken } = await refreshAdmin();
        prvsRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosPublic(prvsRequest);
      }catch(error){
        console.log("Error refreshing token:", error)
        throw error
      }
    }
    return Promise.reject(err);
  }
);