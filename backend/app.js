const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8000;

let corsOptions = {
  origin: ["http://127.0.0.1:5173", "http://127.0.0.1:5174"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoute = require("./routes/authRoutes");
app.use(authRoute);

const friendRoute = require("./routes/friendRoutes");
app.use(friendRoute);

const messageRoute = require("./routes/messageRoute");
app.use(messageRoute);

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
