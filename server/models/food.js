import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
});

const FoodModal = mongoose.model("Food", foodSchema);

export default FoodModal;
