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

export const getFoods = createAsyncThunk(
  "food/getFoods",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getFoods(page);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getFood = createAsyncThunk(
  "food/getFood",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getFood(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const likeFood = createAsyncThunk(
  "food/likeFood",
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likeFood(_id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getFoodsByUser = createAsyncThunk(
  "food/getFoodsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getFoodsByUser(userId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteFood = createAsyncThunk(
  "food/deleteFood",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteFood(id);
      toast.success("Tour Deleted Successfully");
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

export const searchFoods = createAsyncThunk(
  "food/searchFoods",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getFoodsBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getFoodsByTag = createAsyncThunk(
  "food/getFoodsByTag",
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getTagFoods(tag);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getRelatedFoods = createAsyncThunk(
  "food/getRelatedFoods",
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedFoods(tags);
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
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
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
    [getFoods.pending]: (state, action) => {
      state.loading = true;
    },
    [getFoods.fulfilled]: (state, action) => {
      state.loading = false;
      state.foods = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getFoods.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getFood.pending]: (state, action) => {
      state.loading = true;
    },
    [getFood.fulfilled]: (state, action) => {
      state.loading = false;
      state.food = action.payload;
    },
    [getFood.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getFoodsByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getFoodsByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    },
    [getFoodsByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteFood.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteFood.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userFoods = state.userFoods.filter((item) => item._id !== id);
        state.foods = state.foods.filter((item) => item._id !== id);
      }
    },
    [deleteFood.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
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
    [likeFood.pending]: (state, action) => {},
    [likeFood.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { _id },
      } = action.meta;
      if (_id) {
        state.tours = state.tours.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    },
    [likeFood.rejected]: (state, action) => {
      state.error = action.payload.message;
    },

    [searchFoods.pending]: (state, action) => {
      state.loading = true;
    },
    [searchFoods.fulfilled]: (state, action) => {
      state.loading = false;
      state.foods = action.payload;
    },
    [searchFoods.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getFoodsByTag.pending]: (state, action) => {
      state.loading = true;
    },
    [getFoodsByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.tagFoods = action.payload;
    },
    [getFoodsByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getRelatedFoods.pending]: (state, action) => {
      state.loading = true;
    },
    [getRelatedFoods.fulfilled]: (state, action) => {
      state.loading = false;
      state.RelatedFoods = action.payload;
    },
    [getRelatedFoods.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = foodSlice.actions;
export default foodSlice.reducer;
