const express = require("express");
const contactoController = require("../controllers/contactoController");
const router = express.Router();

router.post("/", contactoController.createContactMessage);

module.exports = router;