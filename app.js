const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const handlebars = require("express-handlebars");
const connectDB = require("./db");
const cr = require("./lib/streetData");

const app = express();
require("dotenv/config");

//Import post routes
const postsRoute = require("./routes/posts");
//Import gets routes
const getsRoute = require("./routes/gets");

let cdata;

//middleware
app.use(bodyparser.json());
app.use("/gets", getsRoute);
app.use("/posts", postsRoute);

//Handlebar engine
//Sets handlebars configurations (we will go through them later on)
app.engine(
	"handlebars",
	handlebars({
		layoutsDir: __dirname + "/views/layouts",
		defaultLayout: "index"
	})
);
app.set("view engine", "handlebars");

//load index layout and fill it with main html data into body
app.get("/", async (req, res) => {
	//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
	//res.render('main', {layout : 'index'});
	try {
		cdata = await cr.getData(req.query.street);
	} catch (e) {
		//this will eventually be handled by your error handling middleware
		next(e);
	}
	res.render("main", { crimes: cdata });
});

// Connect to database
connectDB();

// lisgerner

app.listen(3000);
