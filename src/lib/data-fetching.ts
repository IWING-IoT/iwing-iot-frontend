import axios from "axios";
import { getServerAuthSession } from "@/lib/auth";

export const axiosClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const session = await getServerAuthSession(); // Retrieve the current session

    if (session && session.user.accessToken) {
      // Set the accessToken in the Authorization header
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const fetchProject = async () => {
  try {
    const { data } = await axiosClient.get(`/project?sortBy=ascending`);
    // console.log("data => ", data);
    return data;
  } catch (error) {
    throw error;
  }
};
