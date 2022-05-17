import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import FoodReducer from "./features/foodSlice";
export default configureStore({
  reducer: {
    auth: AuthReducer,
    food: FoodReducer,
  },
});
