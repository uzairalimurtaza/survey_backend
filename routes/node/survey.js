const express = require("express");
const {
  createParentNode,
  createChildNode,
  getchildrenOfParentNode,
  createQuestion,
  createOption,
  viewQuestionsByTopic,
  viewOptions,
  createClick,
  linkNextQuestion,
  createSurvey,
  viewSurvey,
  viewParentNode,
  viewTopicWithQuestions,
  viewQuestionForAdmin,
  doneQuestion,
  getQuestionById,
  viewClicks,
  linkUserWithSurvey,
  setNextQuestionsDefault,
  getallUsers,
  getsingleUser,
} = require("../../controllers/node/survey");
const { protect } = require("../../middleware/auth");
const router = express.Router();
router.route("/topic/questions/:id").get(protect, viewTopicWithQuestions);
router.route("/topic").post(protect, createParentNode);
router.route("/topic").get(protect, viewParentNode);
router.route("/child").post(protect, createChildNode);
router.route("/child/:id").get(protect, getchildrenOfParentNode);
router.route("/question").post(protect, createQuestion);
router.route("/option").post(protect, createOption);
router.route("/option/:id").get(protect, viewOptions);
router.route("/get/question/:id").get(protect, getQuestionById);
router.route("/question/:id").get(protect, viewQuestionsByTopic);
router.route("/click").post(protect, createClick);
router.route("/next/:id").put(protect, linkNextQuestion);
router.route("/user/survey").post(protect, createSurvey);
router.route("/user/survey").get(protect, viewSurvey);
router.route("/admin/survey/:id").get(protect, viewQuestionForAdmin);
router.route("/done/:id").get(protect, doneQuestion);
router.route("/clicks/:id").get(protect, viewClicks);
router.route("/link/user").put(protect, linkUserWithSurvey);
router.route("/users/get/all").get(protect, getallUsers);
router.route("/single/users/get/:id").get(protect, getsingleUser);
router.route("/set/next/default/:id").get(protect, setNextQuestionsDefault);

module.exports = router;
