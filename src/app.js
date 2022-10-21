const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const reqLogger = require("./utils/reqLogger");
const dotenv = require("dotenv");


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use(reqLogger); // request logger
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send(`Welcome to Osas Fashion app`);
});

// Global 404 error handler
app.use((req, res) => res.status(404).send({
  status: "error",
  error: "Not found",
  message: "Route not correct kindly check url.",
}));

(async () => {
  app.listen(port || 4000, async () => {
    console.log(
      `${process.env.APP_NAME} API listening on ${port || 4000}`
    );
  });
})();

process.on("unhandledRejection", (error) => {
  console.log("FATAL UNEXPECTED UNHANDLED REJECTION!", error.message);
  console.error("\n\n", error, "\n\n");
});

module.exports =  app;