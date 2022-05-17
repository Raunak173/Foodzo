import FoodModal from "../models/food.js";

export const createFood = async (req, res) => {
  const food = req.body;
  const newFood = new FoodModal({
    ...food,
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
  try {
    const foods = await FoodModal.find();
    res.status(201).json(foods);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
