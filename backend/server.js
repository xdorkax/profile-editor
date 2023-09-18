const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

app.use(fileUpload());

app.use(bodyParser.json());

app.get("/", (req, res) =>
	res.sendFile(path.join(`${__dirname}/../frontend/index.html`))
);

app.use("/public", express.static(`${__dirname}/../frontend/public`));

app.get("/profile.jpg", (req, res) =>
	res.sendFile(path.join(`${__dirname}/../backend/data/profile.jpg`))
);

app.post("/", (req, res) => {
	const pictureUploadPath = __dirname + "/../backend/data/" + "profile.jpg";
	console.log(req.files);

	if (req.files) {
		const uploadedPicture = req.files.picture;
		uploadedPicture.mv(pictureUploadPath, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
	}

	const fileData = req.body;
	fileData.picture = "/profile.jpg";
	const fileDataString = JSON.stringify(fileData, null, 2);
	const uploadPath = __dirname + "/../backend/data/" + "profile.json";

	fs.writeFileSync(uploadPath, fileDataString, (err) => {
		if (err) {
			console.log(err);
			return res.status(500).send(err);
		}
	});

	return res.send(fileDataString);
});

app.delete("/", (req, res) => {
	const pictureUploadPath = __dirname + "/../backend/data/" + "profile.jpg";
	const uploadPath = __dirname + "/../backend/data/" + "profile.json";

	if (fs.existsSync(pictureUploadPath)) {
		fs.unlinkSync(pictureUploadPath, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
	}

	if (fs.existsSync(uploadPath)) {
		fs.unlinkSync(uploadPath, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
	}

	return res.status(200).send("done");
});

app.listen(9000, (_) => console.log("127.0.0.1:9000"));
