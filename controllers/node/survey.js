const asyncHandler = require("../../middleware/async");
const Parent = require("../../models/node/Parent");
const Child = require("../../models/node/Child");
const Question = require("../../models/node/question");
const Option = require("../../models/node/option");
const Clicks = require("../../models/node/Clicks");
const Survey = require("../../models/node/Survey");
const User = require("../../models/users_model");

exports.viewQuestionForAdmin = asyncHandler(async (req, res, next) => {
  try {
    let topic_with_questions = [];
    if (req.params.id == undefined) {
      res.status(200).json({
        status: 200,
        message: "Unable to fetch date",
      });
    } else {
      const topic = await Parent.findById({ _id: req.params.id });
      const questions = await Question.find({
        topic_id: req.params.id,
        status: "Pending",
      });

      for (let i = 0; i < questions.length; i++) {
        let options = await Option.find({ question_id: questions[i].id });
        if (options.length > 0) {
          topic_with_questions.push({
            topic: topic,
            question: questions[i],
            options: options,
          });
        } else {
          topic_with_questions.push({
            topic: topic,
            question: questions[i],
            options: [],
          });
        }
      }
      res.status(200).json({
        status: 200,
        topic_with_questions,
      });
    }
  } catch (err) {
    next(err);
  }
});

exports.doneQuestion = asyncHandler(async (req, res, next) => {
  try {
    const question = await Question.findByIdAndUpdate(
      { _id: req.params.id },
      { status: "Done" },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({
      status: 200,
      message: "Done",
    });
  } catch (err) {
    next(err);
    res.status(200).json({
      status: 400,
      message: "Error",
    });
  }
});

exports.linkNextQuestion = asyncHandler(async (req, res, next) => {
  try {
    let { question_id } = req.body;
    let option_id = req.params.id;
    const option = await Option.findByIdAndUpdate(
      { _id: req.params.id },
      { next_question_id: question_id, status: "linked" },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({
      status: 200,
      message: "next question saved",
    });
  } catch (err) {
    next(err);
  }
});

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

exports.viewParentNode = asyncHandler(async (req, res, next) => {
  try {
    const parentNode = await Parent.find();
    res.status(200).json({
      status: 200,
      topics: parentNode,
    });
  } catch (err) {
    next(err);
  }
});

exports.createQuestion = asyncHandler(async (req, res, next) => {
  try {
    let { question, topic_id } = req.body;
    const question_ = await Question.create({
      question,
      topic_id,
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
    let { option, question_id, topic_id } = req.body;
    const option_ = await Option.create({
      option,
      topic_id,
      question_id,
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

exports.createClick = asyncHandler(async (req, res, next) => {
  try {
    let { option_id, question_id } = req.body;
    const click = await Clicks.create({
      option_id,
      question_id,
      user_id: req.user.id,
    });
    res.status(200).json({
      status: 200,
      click,
      message: "Click saved",
    });
  } catch (err) {
    next(err);
  }
});

exports.viewQuestionsByTopic = asyncHandler(async (req, res, next) => {
  try {
    let topic_id = req.params.id;
    const questions = await Question.find({ topic_id: topic_id });
    res.status(200).json({
      status: 200,
      questions,
    });
  } catch (err) {
    next(err);
  }
});

exports.getNextQuestion = asyncHandler(async (req, res, next) => {
  try {
    const question = await Question.findById({ _id: req.params.id });
    res.status(200).json({
      status: 200,
      question,
    });
  } catch (err) {
    next(err);
  }
});

exports.viewOptions = asyncHandler(async (req, res, next) => {
  try {
    let question_id = req.params.id;
    const options = await Option.find({ question_id: question_id });
    res.status(200).json({
      status: 200,
      options,
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

exports.createSurvey = asyncHandler(async (req, res, next) => {
  try {
    let { survey } = req.body;
    const survey_ = await Survey.create({
      user_id: req.user.id,
      survey: survey,
    });
    res.status(200).json({
      status: 200,
      survey: survey_,
    });
  } catch (err) {
    next(err);
  }
});

exports.viewSurvey = asyncHandler(async (req, res, next) => {
  try {
    const survey_ = await Survey.find({ user_id: req.user.id });
    res.status(200).json({
      status: 200,
      survey: survey_,
    });
  } catch (err) {
    next(err);
  }
});

exports.viewTopicWithQuestions = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.params);
    let topic_with_questions = [];
    const topic = await Parent.findById({ _id: req.params.id });
    const questions = await Question.find({ topic_id: req.params.id });
    const options = await Option.find();
    const clicks = await Clicks.find();
    // console.log(clicks);
    let option_with_clicks = [];
    let options_ = [];

    for (let i = 0; i < questions.length; i++) {
      let options_for_questions = await options.filter(
        (option) => option.question_id == questions[i].id
      );

      let options_array = [];

      for (let j = 0; j < options_for_questions.length; j++) {
        let click_for_options = await clicks.filter(
          (c) => c.option_id == options_for_questions[j].id
        );
        options_array.push({
          option: options_for_questions[j],
          clicks: click_for_options.length,
        });
      }
      topic_with_questions.push({
        question: questions[i],
        options: options_array,
      });
    }
    res.status(200).json({
      status: 200,
      topic_with_questions,
    });
  } catch (err) {
    next(err);
  }
});

exports.dashboard = asyncHandler(async (req, res, next) => {
  try {
    const topics = await Parent.find();
  } catch (err) {
    next(err);
  }
});

exports.getQuestionById = asyncHandler(async (req, res, next) => {
  try {
    const question = await Question.findById({ _id: req.params.id });
    let options = await Option.find({ question_id: question.id });
    res.status(200).json({
      status: 200,
      question: {
        question,
        options: options,
      },
    });
  } catch (err) {
    next(err);
  }
});

exports.viewClicks = asyncHandler(async (req, res, next) => {
  try {
    let question_id = req.params.id;
    if (question_id == null || question_id == "" || question_id == undefined) {
      res.status(200).json({
        status: 200,
        message: "Question id not provided",
      });
    } else {
      const question = await Question.findById({ _id: question_id });
      const options = await Option.find({ question_id: question.id });
      const clicks = await Clicks.find();
      let click_survey = [];

      for (let i = 0; i < options.length; i++) {
        const clicks_ = await clicks.filter(
          (c) => options[i].id == c.option_id
        );
        click_survey.push({
          option: options[i].id,
          option: options[i].option,
          click: clicks_,
          total_clicks: clicks_.length,
        });
      }
      res.status(200).json({
        status: 200,
        clicks: click_survey,
      });
    }
  } catch (err) {
    next(err);
    res.status(200).json({
      status: 400,
      message: "Error while fetching clicks",
    });
  }
});

exports.setNextQuestionsDefault = asyncHandler(async (req, res, next) => {
  try {
    let topic_id = req.params.id;
    if (topic_id == null || topic_id == undefined || topic_id == "") {
      res.status(200).json({
        status: 200,
        message: "please provide a topic_id",
      });
    } else {
      const questions = await Question.find({ topic_id: req.params.id });
      // console.log(questions.length);
      for (let i = 0; i < questions.length - 1; i++) {
        console.log(i);
        const options = await Option.find({
          topic_id: req.params.id,
          question_id: questions[i].id,
        });
        // console.log(options.length);
        for (let j = 0; j < options.length; j++) {
          // console.log(j);
          const update_options = await Option.findByIdAndUpdate(
            { _id: options[j].id },
            { next_question_id: questions[i + 1].id },
            { new: true, useFindAndModify: false }
          );
          // console.log(update_options);
        }
      }
      res.status(200).json({
        status: 200,
        message: "All questions linked successfully",
      });
    }
  } catch (err) {
    next(err);
    res.status(200).json({
      status: 400,
      message: "Error while linking questions",
    });
  }
});

exports.linkUserWithSurvey = asyncHandler(async (req, res, next) => {
  try {
    // const topic = await Parent.findById({ _id: req.body.topic_id });
    let { user_id, topic_id } = req.body;
    if (
      user_id == null ||
      user_id == undefined ||
      user_id == "" ||
      topic_id == null ||
      topic_id == undefined ||
      topic_id == ""
    ) {
      res.status(200).json({
        status: 200,
        message: "Please provide topic_id and user_id",
      });
    } else {
      const user = await User.findByIdAndUpdate(
        { _id: req.body.user_id },
        { topic_id: topic_id },
        { new: true, useFindAndModify: false }
      );

      res.status(200).json({
        status: 200,
        message: "Survey Assigned to the user successfully",
      });
    }
  } catch (err) {
    next(err);
    res.status(200).json({
      status: 400,
      message: "Error while assigning survey to user",
    });
  }
});

exports.getallUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 200,
      users: users,
    });
  } catch (err) {
    next(err);
  }
});

exports.getsingleUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.find({ _id: req.params.id });
    res.status(200).json({
      status: 200,
      user: user,
    });
  } catch (err) {
    next(err);
  }
});

// exports.viewClickofParticularOption = asyncHandler(async (req, res, next) => {
//   try {
//     // const option = await Option.findById({ _id: req.params.id });
//     const clicks = await Click.find({ option_id: req.params.id });
//     if(clicks.length > 0){

//     }
//   } catch (err) {
//     next(err);
//   }
// });
