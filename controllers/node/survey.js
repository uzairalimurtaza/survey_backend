const asyncHandler = require("../../middleware/async");
const Parent = require("../../models/node/Parent");
const Child = require("../../models/node/Child");
const Question = require("../../models/node/question");
const Option = require("../../models/node/option");

exports.createParentNode = asyncHandler(async (req, res, next) => {
  try {
    let { topic } = req.body;
    const parentNode = await Parent.create({
      topic,
    });
    res.status(200).json({
      status: 200,
      parentNode,
      message: "Tree initialized, Please add children for root node",
    });
  } catch (err) {
    next(err);
  }
});

exports.createQuestion = asyncHandler(async (req, res, next) => {
  try {
    let { question, root_id, option_id } = req.body;
    const question_ = await Question.create({
      question,
      root_id,
      option_id
    });
    res.status(200).json({
      status: 200,
      question_,
      message: "Question Created",
    });
  } catch (err) {
    next(err);
  }
});

exports.createOption = asyncHandler(async (req, res, next) => {
  try {
    let { option, question_id } = req.body;
    const option_ = await Option.create({
      option,
      question_id
    });
    res.status(200).json({
      status: 200,
      option_,
      message: "Option Created",
    });
  } catch (err) {
    next(err);
  }
});

exports.viewQuestionOfSelectedOption = asyncHandler(async (req, res, next) => {
  try {
    let question_id = req.params.id;
    const options = await Option.find({question_id: question_id});
    res.status(200).json({
      status: 200,
      options
    });
  } catch (err) {
    next(err);
  }
});

exports.viewOptions = asyncHandler(async (req, res, next) => {
  try {
    let question_id = req.params.id;
    const options = await Option.find({question_id: question_id});
    res.status(200).json({
      status: 200,
      options
    });
  } catch (err) {
    next(err);
  }
});

exports.getchildrenOfParentNode = asyncHandler(async (req, res, next) => {
  try {
    let parent = req.params.id;
    const children = await Child.find({ parent: parent });
    res.status(200).json({
      status: 200,
      children,
    });
  } catch (err) {
    next(err);
  }
});

exports.createChildNode = asyncHandler(async (req, res, next) => {
  try {
    let { text, parentNode } = req.body;
    const childNode = await Child.create({
      text,
      parent: parentNode,
    });
    res.status(200).json({
      status: 200,
      childNode,
      message: "child node created",
    });
  } catch (err) {
    next(err);
  }
});
