import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);
export const createFood = (foodData) => API.post("/food", foodData);
export const getFoods = (page) => API.get(`/food?page=${page}`);
export const getFood = (id) => API.get(`/food/${id}`);
export const deleteFood = (id) => API.delete(`/food/${id}`);
export const updateFood = (updatedFoodData, id) =>
  API.patch(`/food/${id}`, updatedFoodData);
export const getFoodsByUser = (userId) => API.get(`/food/userFoods/${userId}`);

export const getFoodsBySearch = (searchQuery) =>
  API.get(`/food/search?searchQuery=${searchQuery}`);

export const getTagFoods = (tag) => API.get(`/food/tag/${tag}`);
export const getRelatedFoods = (tags) => API.post(`/food/relatedFoods`, tags);
export const likeFood = (id) => API.patch(`/food/like/${id}`);
