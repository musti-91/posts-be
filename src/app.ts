import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const PORT = process.env.PORT || 5000;

/**
 * Load App Routes
 */
import { routes } from "./routes";
// load env variables
dotenv.config();
// MongoDB URL
const URL = `mongodb://${process.env.USER_NAME}:${process.env.PASSWORD}@ds125526.mlab.com:25526/blog-posts`;

// Create Express App
const app = express();
// dummy
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
routes(app);

// * START CONNECTION WITH MONGODB
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`==> Successfully connect to MongoDB`);
  })
  .catch(error => {
    console.log(error);
    process.exit();
  });

// default route
app.get("/", (req, res) => {
  res.send(`If you're looking for api routes, try[/blog-posts]`);
});

app.listen(PORT, () => {
  console.log(`==> Start app on Server https://localshost:${PORT}`);
});
