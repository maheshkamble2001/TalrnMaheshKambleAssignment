const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database");
const developerRoutes = require("./routes/developerRoutes");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
];



const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, ''); // remove trailing slash

    if (allowedOrigins.includes(cleanOrigin)) {
      callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

// Routes
app.use("/", developerRoutes);

// Start server and sync database
const PORT = 4000;
sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
