const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use("static", express.static("public/images"));

app.use((req, res) => {
	res.status(404).json({ message: "Invalid API Endpoint" });
});

app.use((err, req, res, next) => {
	console.log(err);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`listen on port ${PORT}`);
});
