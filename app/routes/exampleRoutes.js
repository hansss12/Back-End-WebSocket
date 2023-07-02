const { LatLon } = require("../controllers/LatLonControllers");
const { callmeWebSocket } = require("../controllers/exampleController");
const express = require('express')
const app = express();

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

const router = require("express").Router();

router.get(
  "/", callmeWebSocket
);

router.get(
  "/latlon", LatLon
);

app.use("/api/data", router);

module.exports = router
