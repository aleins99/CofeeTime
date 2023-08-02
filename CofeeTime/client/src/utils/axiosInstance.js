import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://localhost:8000/cofee/api/";

let authToken = localStorage.getItem("authToken")
  ? JSON.parse(localStorage.getItem("authToken"))
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authToken?.access}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authToken) {
    authToken = localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null;
    req.headers.Authorization = `Bearer ${authToken?.access}`;
  }

  const user = jwt_decode(authToken.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  const response = await axios.post(`${baseURL}token/refresh/`, {
    refresh: authToken.refresh,
  });

  localStorage.setItem("authToken", JSON.stringify(response.data));
  req.headers.Authorization = `Bearer ${response.data.access}`;
  return req;
});

export default axiosInstance;
