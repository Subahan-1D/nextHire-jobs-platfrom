import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
const useAxiosSecure = () => {
  // axios interceptor
  const navigate = useNavigate();
  const { logOut } = useAuth();
  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      console.log("Error from to interceptor", error.response);
      if (error.response.status === 401 || error.response.status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject.error;
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
