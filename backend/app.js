const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const apiRoutes = require("./routes/api");
const dbConfig = require("./config/db");

const app = express();

const pool = new Pool(dbConfig);

// mongoose.connect(dbConfig.url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

app.use(bodyParser.json());
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
