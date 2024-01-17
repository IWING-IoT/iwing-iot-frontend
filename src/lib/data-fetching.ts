import axios from "axios";
import { getServerAuthSession } from "@/lib/auth";
import { getSession } from "next-auth/react";
import { cache } from "react";

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

export const fetchData = cache(
  async (path: string, params?: { key: string; value: string }[]) => {
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
  },
);

export async function clientFetchData(
  path: string,
  params?: { key: string; value: string }[],
) {
  try {
    let response;
    if (params) {
      response = await clientAxios.get(
        path +
          "?" +
          params?.map((param) => `${param.key}=${param.value}`).join("&"),
      );
    } else {
      response = await clientAxios.get(path);
    }
    const { data } = response;
    return data;
  } catch (error) {
    throw error;
  }
}

export async function postData(path: string, body?: unknown) {
  try {
    const { data } = await clientAxios.post(path, body);
    // console.log("data => ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function postFormData(path: string, body: FormData) {
  try {
    const { data } = await clientAxios.post(path, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log("data => ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getFile(path: string) {
  try {
    const { data } = await clientAxios.get(path, {
      headers: { "Content-Type": "application/octet-stream" },
    });
    // console.log("data => ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function patchData(path: string, body?: unknown) {
  try {
    const { data } = await clientAxios.patch(path, body);
    // console.log("data => ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function patchFormData(path: string, body: FormData) {
  try {
    const { data } = await clientAxios.patch(path, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log("data => ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function putData(path: string, body: unknown) {
  try {
    const { data } = await clientAxios.put(path, body);
    // console.log("putdata => ", data);
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
