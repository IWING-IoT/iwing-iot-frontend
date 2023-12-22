import axios from "axios";
import { getServerAuthSession } from "@/lib/auth";
import { getSession, useSession } from "next-auth/react";

export const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

serverAxios.interceptors.request.use(
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

export const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

clientAxios.interceptors.request.use(
  async (config) => {
    const session = await getSession(); // Retrieve the current session

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

export async function fetchData(
  path: string,
  params?: { key: string; value: string }[],
) {
  try {
    let response;
    if (params) {
      response = await serverAxios.get(
        path +
          "?" +
          params?.map((param) => `${param.key}=${param.value}`).join("&"),
      );
    } else {
      response = await serverAxios.get(path);
    }
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function postData(path: string, body: unknown) {
  try {
    const { data } = await clientAxios.post(path, body);
    // console.log("data => ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function patchData(path: string, body: unknown) {
  try {
    const { data } = await clientAxios.patch(path, body);
    // console.log("data => ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function putData(path: string, body: unknown) {
  try {
    const { data } = await clientAxios.put(path, body);
    // console.log("data => ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteData(path: string) {
  try {
    const { data } = await clientAxios.delete(path);
    // console.log("data => ", data);
    return data;
  } catch (error) {
    throw error;
  }
}
