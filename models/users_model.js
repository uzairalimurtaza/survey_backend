var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  arfirstname: {
    type: String,
  },
  teritory: {
    type: String,
  },
  area: {
    type: String,
  },
  outletName: {
    type: String,
  },
  region: {
    type: String,
  },
  arlastname: {
    type: String,
  },
  topic_id: {
    type: mongoose.Types.ObjectId,
  },
  email: {
    type: String,
  },
  roll: {
    type: String,
    default: "User",
  },
  password: {
    type: String,
  },
  language: {
    type: String,
    default: "en",
  },
  active: {
    type: Boolean,
  },
  phone_number: {
    type: String,
  },
  mobile:{
    type: String
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profile_image: {
    type: String,
  },
  status: {
    type: String,
    default: "Approved",
  },
  CreditCardNumber: {
    type: String,
  },
  Address: {
    type: String,
  },
  device_id: {
    type: String,
  },
  playerId: {
    type: String,
  },
});

// Encrypt Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign jwt and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// assign incremented primary key
userSchema.pre("save", function (next) {
  this.user_id = this.user_id + 1;
  next();
});

// Match user entered password to hashed password in db
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
module.exports = mongoose.model("User", userSchema);
