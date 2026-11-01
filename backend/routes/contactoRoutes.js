const express = require("express");
const contactoController = require("../controllers/contactoController");
const router = express.Router();

router.post("/", contactoController.createContactMessage);
router.get("/", contactoController.getAllContactMessages);
router.delete("/:id", contactoController.deleteContactMessage);

module.exports = router;