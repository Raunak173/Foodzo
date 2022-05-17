import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createFood = createAsyncThunk(
  "food/createFood",
  async ({ updatedFoodData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createFood(updatedFoodData);
      toast.success("Food Added Successfully!");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateFood = createAsyncThunk(
  "tour/updateFood",
  async ({ id, updatedFoodData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateFood(updatedFoodData, id);
      toast.success("Food Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const foodSlice = createSlice({
  name: "food",
  initialState: {
    food: {},
    foods: [],
    userFoods: [],
    tagFoods: [],
    relatedFoods: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  extraReducers: {
    [createFood.pending]: (state, action) => {
      state.loading = true;
    },
    [createFood.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = [action.payload];
    },
    [createFood.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // [getTours.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [getTours.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.tours = action.payload.data;
    //   state.numberOfPages = action.payload.numberOfPages;
    //   state.currentPage = action.payload.currentPage;
    // },
    // [getTours.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
    // [getTour.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [getTour.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.tour = action.payload;
    // },
    // [getTour.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
    // [getToursByUser.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [getToursByUser.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.userTours = action.payload;
    // },
    // [getToursByUser.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
    // [deleteTour.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [deleteTour.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   const {
    //     arg: { id },
    //   } = action.meta;
    //   if (id) {
    //     state.userTours = state.userTours.filter((item) => item._id !== id);
    //     state.tours = state.tours.filter((item) => item._id !== id);
    //   }
    // },
    // [deleteTour.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
    [updateFood.pending]: (state, action) => {
      state.loading = true;
    },
    [updateFood.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userFoods = state.userFoods.map((item) =>
          item._id === id ? action.payload : item
        );
        state.foods = state.foods.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateFood.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // [likeTour.pending]: (state, action) => {},
    // [likeTour.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   const {
    //     arg: { _id },
    //   } = action.meta;
    //   if (_id) {
    //     state.tours = state.tours.map((item) =>
    //       item._id === _id ? action.payload : item
    //     );
    //   }
    // },
    // [likeTour.rejected]: (state, action) => {
    //   state.error = action.payload.message;
    // },

    // [searchTours.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [searchTours.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.tours = action.payload;
    // },
    // [searchTours.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
    // [getToursByTag.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [getToursByTag.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.tagTours = action.payload;
    // },
    // [getToursByTag.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
    // [getRelatedTours.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [getRelatedTours.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.relatedTours = action.payload;
    // },
    // [getRelatedTours.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
  },
});

export default foodSlice.reducer;
