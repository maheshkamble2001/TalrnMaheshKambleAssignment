const express = require("express");
const router = express.Router();
const developerController = require("../controllers/developerController");

router.post("/developers", developerController.addDeveloper);
router.get("/developers", developerController.getAllDevelopers);

module.exports = router;
