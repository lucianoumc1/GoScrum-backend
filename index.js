const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");
const passport = require("./utils/auth");

const {
  logErrors,
  handleBoomError,
  handleError,
  handleOrmError,
} = require("./middlewares/handleErrors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Welcome to GoScrum API");
});

routerApi(app);

app.use(logErrors);
app.use(handleBoomError);
app.use(handleOrmError);
app.use(handleError);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`http://localhost:${port}`);
});
