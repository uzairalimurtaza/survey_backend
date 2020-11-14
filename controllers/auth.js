const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/users_model");
const Logger = require("../models/Logger")
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail')
const fs = require('fs');
const bcrypt = require("bcryptjs");
const pushNot = require('../middleware/pushNotification')

exports.register = asyncHandler(async (req, res, next) => {
  var { firstname, lastname, email, password, confirmPassword, phone_number, roll } = req.body;
  try {
    if (phone_number == null || phone_number == '' || phone_number == undefined) {
      return res.status(200).json({
        status: 400,
        message: 'Please provide your phone_number'
      });;
    } else if (firstname == null || firstname == '' || firstname == undefined) {
      return res.status(200).json({
        status: 400,
        message: 'Please provide your phone_number'
      });;
    } else if (lastname == null || lastname == '' || lastname == undefined) {
      return res.status(200).json({
        status: 400,
        message: 'Please provide your phone_number'
      });;
    } else if (email == null || email == '' || email == undefined) {
      return res.status(200).json({
        status: 400,
        message: 'Please provide your phone_number'
      });;
    } else if (password == null || password == '' || password == undefined) {
      return res.status(200).json({
        status: 400,
        message: 'Please provide your phone_number'
      });;
    } else if (confirmPassword == null || confirmPassword == '' || confirmPassword == undefined) {
      return res.status(200).json({
        status: 400,
        message: 'Please provide your phone_number'
      });
    } else if (!(password === confirmPassword)) {
      res.status(200).json({
        status: 400,
        message: 'Password not matched'
      })
    } else {
      const email_check = await User.find({ email: email });
      const phone_check = await User.find({ phone_number: phone_number });
      if (email_check.length > 0) {
        return res.status(200).json({
          status: 400,
          message: 'User already registered with this email'
        });
      }
      else if (phone_check.length > 0) {
        return res.status(200).json({
          status: 400,
          message: 'User already registered with this phone number'
        });
      } else {
        if (roll == null || roll == '' || roll == undefined) {

          const user = await User.create({
            firstname,
            lastname,
            email,
            password,
            phone_number,
            status: 'Approved'
          });
          // create transpoter function
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
          });
          // mail options
          let mailOptions = {
            from: 'uzaialimurtaza@gmail.com',
            to: email,
            subject: 'Masoon Account Credentials',
            text: `You can login to masoon using email: ${email} and password: ${password}`
          };

          // send mail
          transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
              console.log('error occured');
            }
            else {
              console.log("mail sent!!!")
            }
          });
          res.status(200).json({
            status: 200,
            message: 'User registered successfully'
          });
        }
        else if (roll === 'Publisher') {
          const user = await User.create({
            firstname,
            lastname,
            email,
            password,
            roll,
            phone_number,
            status: 'Pending'
          });
          // create transpoter function
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
            }
          });
          // mail options
          let mailOptions = {
            from: 'uzaialimurtaza@gmail.com',
            to: email,
            subject: 'Masoon Account Credentials',
            text: `You can login to masoon using email: ${email} and password: ${password}`
          };

          // send mail
          transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
              console.log('error occured');
            }
            else {
              console.log("mail sent!!!")
            }
          });
          res.status(200).json({
            status: 200,
            message: 'User registered successfully'
          });
        }
      }
    }
  } catch (err) {
    next(err);
  }















  // const email_check = await User.find({ email: email });
  // const phone_check = await User.find({ phone_number: phone_number });
  // if (email_check.length > 0) {
  //   return res.status(200).json({
  //     status: 400,
  //     message: 'User already registered with this email'
  //   });
  // }

  // else if (phone_check.length > 0) {
  //   return res.status(200).json({
  //     status: 400,
  //     message: 'User already registered with this phone number'
  //   });
  // }
  // else {
  //   if (!phone_number) {
  //     return res.status(200).json({
  //       status: 400,
  //       message: 'Please provide your phone_number'
  //     });;
  //   }
  //   if (!firstname) {
  //     return res.status(200).json({
  //       status: 400,
  //       message: 'Please provide firstname'
  //     });
  //   }
  //   else if (!lastname) {
  //     return res.status(200).json({
  //       status: 400,
  //       message: 'Please provide lastname'
  //     });
  //   }
  //   else if (!email) {
  //     return res.status(200).json({
  //       status: 400,
  //       message: 'Please provide an email'
  //     });
  //   }
  //   else if (!password) {
  //     return res.status(200).json({
  //       status: 400,
  //       message: 'Please provide a password'
  //     });;
  //   }
  //   else if (!confirmPassword) {
  //     return res.status(200).json({
  //       status: 400,
  //       message: 'Please confirm your password'
  //     });;
  //   }
  //   else if (password.length < 8) {
  //     return res.status(200).json({
  //       status: 400,
  //       message: 'password length must be at least 8 characters'
  //     });;
  //   }
  //   try {
  //     if (!(password === confirmPassword)) {
  //       res.status(200).json({
  //         status: 400,
  //         message: 'Password not matched'
  //       })
  //     }
  //     else {

  //       if (roll === 'Publisher') {
  //         const user = await User.create({
  //           firstname,
  //           lastname,
  //           email,
  //           password,
  //           roll,
  //           phone_number,
  //           status: 'Pending'
  //         });

  //         // create transpoter function
  //         let transporter = nodemailer.createTransport({
  //           service: 'gmail',
  //           auth: {
  //             user: process.env.EMAIL,
  //             pass: process.env.PASSWORD
  //           }
  //         });

  //         // mail options
  //         let mailOptions = {
  //           from: 'uzaialimurtaza@gmail.com',
  //           to: email,
  //           subject: 'Masoon Account Credentials',
  //           text: `You can login to masoon using email: ${email} and password: ${password}`
  //         };

  //         // send mail
  //         transporter.sendMail(mailOptions, (err, data) => {
  //           if (err) {
  //             console.log('error occured');
  //           }
  //           else {
  //             console.log("mail sent!!!")
  //           }
  //         });

  //       }
  //       else {
  //         const user = await User.create({
  //           firstname,
  //           lastname,
  //           email,
  //           password,
  //           roll,
  //           phone_number
  //         });

  //         // create transpoter function
  //         let transporter = nodemailer.createTransport({
  //           service: 'gmail',
  //           auth: {
  //             user: process.env.EMAIL,
  //             pass: process.env.PASSWORD
  //           }
  //         });

  //         // mail options
  //         let mailOptions = {
  //           from: 'uzaialimurtaza@gmail.com',
  //           to: 'aliraheel62@gmail.com',
  //           subject: 'Testing email',
  //           text: `User registered with email: ${email} name: ${firstname} ${lastname}`
  //         };

  //         // send mail
  //         transporter.sendMail(mailOptions, (err, data) => {
  //           if (err) {
  //             console.log('error occured');
  //           }
  //           else {
  //             console.log("mail sent!!!")
  //           }
  //         });


  //       }


  //       res.status(200).json({
  //         status: 200,
  //         message: 'User registered successfully'
  //       });
  //     }
  //   } catch (err) {
  //     next(err);
  //     res.status(200).json({
  //       status: 400,
  //       message: 'Email already exists'
  //     })
  //   }
  // }
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body)
  // console.log(password + ' ' + email)

  //   Validate Email and Password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }


  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }


  // check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  let { device_id } = req.body;
  if (!(device_id == undefined)) {
    const user_ = await User.findByIdAndUpdate({ _id: user.id }, { device_id: device_id }, { new: true, useFindAndModify: false });
  }
  let { playerId } = req.body;
  // console.log(req.body)
  if (!(playerId == undefined)) {
    // console.log(user.playerId);
    if (user.playerId == "disabled") {
      const user_ = await User.findByIdAndUpdate({ _id: user.id }, { playerId: "disabled" }, { new: true, useFindAndModify: false });
    } else if (user.playerId == undefined) {
      const user_ = await User.findByIdAndUpdate({ _id: user.id }, { playerId: playerId }, { new: true, useFindAndModify: false });
    }
  }

  sendTokenResponse(user, 200, res);
});
// Get token from model, create cookie and send response
const sendTokenResponse = async (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  const date = new Date();
  let current_time = date.getTime();
  const logger = await Logger.create({
    user_id: user.id,
    username: user.firstname + " " + user.lastname,
    user_email: user.email,
    time: current_time
  })


  res.status(statusCode).cookie("token", token, options).json({
    success: {
      token: token,
      type: user.roll,
      user_name: user.firstname,
      user_id: user.id,
      lang: user.language
    },
    status: user.status
  });
};
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    profile: user
  })
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else)
   has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    next(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse('Email could not be sent', 200));
  }

  // res.status(200).json({
  //   success: true,
  //   data: user
  // });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid token', 200));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

exports.updatePassword = asyncHandler(async (req, res, next) => {

  // try {
  //   var { newPassword, confirmPassword, currentPassword } = req.body

  //   User.findOne({user_id: req.user.id}, (err, user)=>{
  //     if(user != null){
  //       var hash = user.password
  //       bcrypt.compare(hash, currentPassword, (err, res)=>{
  //         if(res){
  //           if(newPassword == confirmPassword){
  //             bcrypt.hash(newPassword)
  //           }
  //         }
  //       })
  //     }
  //   })


  // } catch (err) {
  //   next(err);
  // }


  try {
    const user = await User.findById(req.user.id).select('+password');
    // console.log(req.body);

    var { newPassword } = req.body

    const result = await user.matchPassword(req.body.currentPassword);

    // Check current password
    if (result === false) {
      res.status(200).json({
        status: 401,
        message: 'Incorrect current password'
      })
    }
    else if (result === true) {
      // user.password = req.body.newPassword;

      const salt = await bcrypt.genSalt(10);
      const update_password_of_user = await bcrypt.hash(newPassword, salt, null);
      const user_update = await User.findByIdAndUpdate({ _id: req.user.id }, { password: update_password_of_user }, { new: true, useFindAndModify: false });
      res.status(200).json({
        status: 200,
        message: 'Password updated successfully'
      })
    }
  } catch (err) {
    next(err);
    res.status(200).json({
      status: 400,
      message: 'Error while updating password'
    })
  }
});

exports.getU = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const user = await User.findById({ _id: user_id });
    // console.log(req.file);
    if (user.profile_image !== undefined && user.profile_image) {
      // console.log('image exists')
      const path = user.profile_image

      fs.unlink(path, (err) => {
        if (err) {
          next(err)
          return
        }
        else {
          User.findByIdAndUpdate({ _id: user_id }, { profile_image: req.file.path.replace("\\", "/") }, { new: true, useFindAndModify: false }).then((profile) => {
            profile
          }).catch((err) => {
            next(err)
          })
          res.status(200).json({
            status: 200,
            message: 'file removed successfully and updated'
          })
        }
      })
    }
    else if (user.profile_image === undefined || user.profile_image === null || user.profile_image) {
      // console.log('image do not exists')
      const user_ = await User.findByIdAndUpdate({ _id: user_id }, { profile_image: req.file.path.replace("\\", "/") }, { new: true, useFindAndModify: false });
      res.status(200).json({
        status: 200,
        message: 'updated'
      })
    }
  } catch (err) {
    next(err);
    res.status(200).json({
      status: 400,
      message: 'Error while updating image'
    })
  }
});

exports.editprofile = asyncHandler(async (req, res, next) => {
  try {

    const profile = await User.findOne({ _id: req.user.id });

    const update_profile = await User.findByIdAndUpdate({ _id: req.user.id }, req.body, { new: true, useFindAndModify: false });

    res.status(200).json({
      status: 200,
      message: "Profile updated successfully"
    })

  } catch (err) {
    next(err);
  }
})

exports.updateEmail = asyncHandler(async (req, res, next) => {
  try {
    let { email } = req.body
    const profile = await User.find({ email: email });
    if (profile.length > 0) {
      res.status(200).json({
        status: 400,
        message: "Email already taken, please select another different email"
      })
    } else {
      const update_profile = await User.findByIdAndUpdate({ _id: req.user.id }, { email: email }, { new: true, useFindAndModify: false });
      res.status(200).json({
        status: 200,
        message: "Email updated successfully"
      })
    }
  } catch (err) {
    next(err);
  }
});

exports.updatePhoneNumber = asyncHandler(async (req, res, next) => {
  try {
    let { phone_number } = req.body
    const profile = await User.find({ phone_number: phone_number });
    if (profile.length > 0) {
      res.status(200).json({
        status: 400,
        message: "Phone number already exists, please select another different Phone number"
      })
    } else {
      const update_profile = await User.findByIdAndUpdate({ _id: req.user.id }, { phone_number: phone_number }, { new: true, useFindAndModify: false });
      res.status(200).json({
        status: 200,
        message: "Phone Number updated successfully"
      })
    }

  } catch (err) {
    next(err);
  }
});

exports.updateAdvertiser = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.params.id
    const { firstname, lastname, email, phone_number, language } = req.body

    // console.log(req.body)

    if (firstname == undefined || lastname == undefined || email == undefined || phone_number == undefined || language == undefined
      || firstname == null || lastname == null || email == null || phone_number == null || language == null
      || firstname == "" || lastname == "" || email == "" || phone_number == "" || language == "") {
      res.status(200).json({
        status: 400,
        message: 'Please provide all the required fields'
      })
    } else {
      const findUser = await User.findById({ _id: user_id });
      if (findUser.email == email) {
        if (findUser.phone_number == phone_number) {
          const update_user = await User.findByIdAndUpdate(
            { _id: user_id },
            { firstname: firstname, lastname: lastname, language: language },
            { new: true, useFindAndModify: false })
          res.status(200).json({
            status: 200,
            message: 'Profile Updated'
          })
        } else if (findUser.phone_number != phone_number) {
          const phone_check = await User.find({ phone_number: phone_number });
          if (phone_check.length > 0) {
            res.status(200).json({
              status: 400,
              message: 'Phone number already exists, please choose different one'
            })
          } else {
            const update_user = await User.findByIdAndUpdate(
              { _id: user_id },
              { phone_number: phone_number, firstname: firstname, lastname: lastname, language: language },
              { new: true, useFindAndModify: false });
            res.status(200).json({
              status: 200,
              message: 'Profile Updated'
            })
          }
        }
      } else if (findUser.email != email) {
        const email_check = await User.find({ email: email });
        if (email_check.length > 0) {
          res.status(200).json({
            status: 400,
            message: 'Email already exists, please choose different email'
          })
        } else {
          if (findUser.phone_number == phone_number) {
            const update_user = await User.findByIdAndUpdate(
              { _id: user_id },
              { email: email, firstname: firstname, lastname: lastname, language: language },
              { new: true, useFindAndModify: false })
            res.status(200).json({
              status: 200,
              message: 'Profile Updated'
            })
          } else if (findUser.phone_number != phone_number) {
            const phone_check = await User.find({ phone_number: phone_number });
            if (phone_check.length > 0) {
              res.status(200).json({
                status: 400,
                message: 'Phone number already exists, please choose different one'
              })
            } else {
              const update_user = await User.findByIdAndUpdate(
                { _id: user_id },
                { email: email, phone_number: phone_number, firstname: firstname, lastname: lastname, language: language },
                { new: true, useFindAndModify: false });
              res.status(200).json({
                status: 200,
                message: 'Profile Updated'
              })
            }
          }
        }
      }
    }

  } catch (err) {
    next(err);
    res.status(200).json({
      status: 400,
      message: 'Error while updating profile'
    })
  }
})

exports.updateAdminProfile = asyncHandler(async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const { firstname, lastname, email } = req.body;

    if (firstname == undefined || lastname == undefined || email == undefined
      || firstname == null || lastname == null || email == null
      || firstname == "" || lastname == "" || email == "") {
      res.status(200).json({
        status: 400,
        message: 'Please provide all required fields'
      })
    } else {
      const findUser = await User.findById({ _id: user_id });
      if (findUser.email == email) {
        const updateUser = await User.findByIdAndUpdate(
          { _id: user_id },
          { firstname: firstname, lastname: lastname },
          { new: true, useFindAndModify: false }
        )
        res.status(200).json({
          status: 200,
          message: "Profile successfully updated"
        })
      } else if (findUser.email != email) {
        const check_email = await User.find({ email: email });
        if (check_email.length > 0) {
          res.status(200).json({
            status: 400,
            message: 'Email already exists, please select a different one'
          })
        } else {
          const updateUser = await User.findByIdAndUpdate(
            { _id: user_id },
            { email: email, firstname: firstname, lastname: lastname },
            { new: true, useFindAndModify: false }
          )
          res.status(200).json({
            status: 200,
            message: "Profile successfully updated"
          })
        }
      }
    }
  } catch (err) {
    next(err);
    res.status(200).json({
      status: 400,
      message: 'Error while updating profile'
    })
  }
})

exports.emailToLowercase = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.find();
    for (let i = 0; i < user.length; i++) {
      // console.log(user[i].id)
      // if (user[i].email) {
      let email = user[i].email.toLowerCase();
      const user_ = await User.findByIdAndUpdate({ _id: user[i].id }, { email: email }, { new: true, useFindAndModify: false });
      // }
    }
    return res.status(200).json({
      status: 200,
      message: 'email updated successfully'
    })
  } catch (err) {
    next(err);
  }
})