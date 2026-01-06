import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const fetchVideos = async () => {
  const response = await api.get("/videos");
  return response.data;
};

export const fetchVideoById = async (id) => {
  const response = await api.get(`/videos/${id}`);
  return response.data;
};

export const getVideoLikes = async (videoId) => {
  const response = await api.get(`/likes/${videoId}`);
  return response.data;
};

export const toggleLike = async (videoId, token) => {
  const response = await api.post(
    `/likes/${videoId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export default api;
