const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/users_model");

// Protect Routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // else if(req.cookies.token){
  //   token = req.cookies.token;
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  try {
    // Verify toker, extracting payload from token
    // token Structure {id: 'xxxxxx', issuedAt: 'xxxx', expireAt: xxxxxx }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(`Decode id: ${decoded.id}`);

    req.user = await User.findById(decoded.id);
    // console.log(req.user);
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});
