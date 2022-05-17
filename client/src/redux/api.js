import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" }); //creates a api with following base url

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);
export const createFood = (foodData) => API.post("/food", foodData);
export const updateFood = (updatedFoodData, id) =>
  API.patch(`/food/${id}`, updatedFoodData);
