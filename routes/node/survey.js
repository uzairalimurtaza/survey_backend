const express = require("express");
const { createParentNode, createChildNode, getchildrenOfParentNode, createQuestion, createOption, viewOptions } = require("../../controllers/node/survey");
const { protect } = require("../../middleware/auth");

const router = express.Router();
router.route("/root").post(protect, createParentNode);
router.route("/child").post(protect, createChildNode);
router.route("/child/:id").get(protect, getchildrenOfParentNode);
router.route("/question").post(protect, createQuestion);
router.route("/option").post(protect, createOption);
router.route("/option/:id").get(protect, viewOptions);
module.exports = router;
