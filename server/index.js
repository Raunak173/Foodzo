import express from "express";
const PORT = 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello backend");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
