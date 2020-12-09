const express = require("express");
const {
    register,
    login,
    getMe,
    getU,
    forgotPassword,
    resetPassword,
    updatePassword,
    emailToLowercase,
    editprofile,
    updateEmail,
    updatePhoneNumber,
    updateAdvertiser,
    updateAdminProfile,
    createUsersInBulk
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");
const multer = require("multer");
const { verifyUser } = require("../controllers/verifyUser");
const parse = multer();

// upload image
let date = new Date();
let current_date = date.getTime();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        console.log('\\', file.fieldname);
        cb(null, `${file.fieldname}-${file.originalname}`);
    }
});
const upload = multer({
    storage: storage
});

const router = express.Router();
router.post("/register", parse.any(), register);
router.put("/email/lowercase", parse.any(), emailToLowercase);
router.post("/login", parse.any(), login);
router.get("/profile", upload.single('profileImage'), protect, getMe);
router.post("/profile/image", protect, upload.single('profile_image'), getU);
router.post("/forgotPassword", parse.any(), protect, forgotPassword);
router.put("/resetpassword/:resettoken", parse.any(), protect, resetPassword);
router.put("/updatePassword", parse.any(), protect, updatePassword);
router.get("/verify/user", parse.any(), protect, verifyUser);
router.put("/auth/update/profile", parse.any(), protect, editprofile);
router.put("/auth/update/email", parse.any(), protect, updateEmail);
router.put("/auth/update/phone", parse.any(), protect, updatePhoneNumber);
router.put("/auth/update/pub/:id", parse.any(), protect, updateAdvertiser);
router.put("/auth/update/admin/:id", parse.any(), protect, updateAdminProfile);
router.post("/create/user/bulk", parse.any(), protect, createUsersInBulk);

module.exports = router;
