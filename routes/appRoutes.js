const express = require("express");
const { appObject } = require("../controllers/app");

const router = express.Router();

router.get("/", appObject);


module.exports = router;
