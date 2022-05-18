import FoodModal from "../models/food.js";
import mongoose from "mongoose";

export const createFood = async (req, res) => {
  const food = req.body;
  const newFood = new FoodModal({
    ...food,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getFoods = async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await FoodModal.countDocuments({});
    const foods = await FoodModal.find().limit(limit).skip(startIndex);
    res.json({
      data: foods,
      currentPage: Number(page),
      totalFoods: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getFood = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await FoodModal.findById(id);
    res.status(200).json(food);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getFoodsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userFoods = await FoodModal.find({ creator: id });
  res.status(200).json(userFoods);
};

export const deleteFood = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No Food exist with id: ${id}` });
    }
    await FoodModal.findByIdAndRemove(id);
    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateFood = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No Food exist with id: ${id}` });
    }

    const updatedFood = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await FoodModal.findByIdAndUpdate(id, updatedFood, { new: true });
    res.json(updatedFood);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getFoodsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const foods = await FoodModal.find({ title });
    res.json(foods);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getFoodsByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const foods = await FoodModal.find({ tags: { $in: tag } });
    res.json(foods);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getRelatedFoods = async (req, res) => {
  const tags = req.body;
  try {
    const foods = await FoodModal.find({ tags: { $in: tags } });
    res.json(foods);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const likeFood = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId) {
      return res.json({ message: "User is not authenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No Food exist with id: ${id}` });
    }

    const food = await FoodModal.findById(id);

    const index = food.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      food.likes.push(req.userId);
    } else {
      food.likes = food.likes.filter((id) => id !== String(req.userId));
    }

    const updatedFood = await FoodModal.findByIdAndUpdate(id, food, {
      new: true,
    });

    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
