import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


async function refresh() {
  const refreshedAccessToken = "your-refreshed-access-token";
  return { accessToken: refreshedAccessToken };
}


axiosPublic.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const accessToken = window.localStorage.getItem('accessToken') as string;
      config.headers.Authorization = JSON.parse(accessToken);
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
      const { accessToken } = await refresh();
      prvsRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosPublic(prvsRequest);
    }
    return Promise.reject(err);
  }
);

export default axiosPublic ;