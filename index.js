const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" })); 
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/actions", require("./routes/actionRoutes"));

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
