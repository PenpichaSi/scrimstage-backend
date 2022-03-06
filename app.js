require("dotenv").config();
require("./config/passport");

const express = require("express");
const app = express();
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const friendRoute = require("./routes/friendRoute");
const findScrimRoute = require("./routes/findScrimRoute");
const findPlayerRoute = require("./routes/findPlayerRoute");
const findTeamRoute = require("./routes/findTeamRoute");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("static", express.static("public/images"));

app.use("/users", userRoute);
// app.use("/friends", friendRoute);
// app.use("/find-scrim", findScrimRoute);
// app.use("find-player", findPlayerRoute);
// app.use("/find-team", findTeamRoute);

app.use((req, res) => {
	res.status(404).json({ message: "Invalid API Endpoint" });
});

app.use((err, req, res, next) => {
	res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`listen on port ${PORT}`);
});
