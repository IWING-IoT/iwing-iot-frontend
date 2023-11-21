import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://54.206.89.205",
});

export const mockApiProject = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: 123445,
          name: "Boat Tracking",
          owner: "Pangpond",
          location: "บางเขน, กรุงเทพมหานคร",
          startedAt: "1970-01-01T00:00:00.000Z",
        },
        {
          id: 123446,
          name: "Boat Tracking 2",
          owner: "Pangpond",
          location: "บางเขน, กรุงเทพมหานคร",
          startedAt: "1970-01-01T00:00:00.000Z",
        },
      ]);
    }, 3000); // 3-second delay
  });
};

export const fetchProject = async () => {
  try {
    const { data } = await axiosClient.get(`/project/getProject`);
    return data;
  } catch (error) {
    throw error;
  }
};
