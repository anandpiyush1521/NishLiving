const router = require("express").Router();
const multer = require("multer");
const { registerUser, loginUser } = require("../controller/authController");

// Upload middleware
const upload = multer({ dest: "public/uploads/" });

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser); // Generates JWT on login

module.exports = router;



// const router = require("express").Router();
// const upload = require("../middleware/fileUpload"); // Import the middleware
// const { registerUser, loginUser } = require("../controller/authController");

// router.post("/register", upload.single("profileImage"), registerUser);
// router.post("/login", loginUser);

// module.exports = router;

// const router = require("express").Router();
// const multer = require("multer");
// const path = require("path");
// const { registerUser, loginUser } = require("../controller/authController");

// // Configure multer storage to retain the original file extension
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/");
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname); // Get the original file extension
//     const fileName = `${Date.now()}-${file.originalname}`; // Customize the filename (using timestamp + original name)
//     cb(null, fileName);
//   },
// });

// // Use the custom storage for multer
// const upload = multer({ storage: storage });

// router.post("/register", upload.single("profileImage"), registerUser);
// router.post("/login", loginUser);

// module.exports = router;


// const router = require("express").Router();
// const multer = require("multer");
// const { registerUser, loginUser } = require("../controller/authController");

// // const upload = multer({ dest: "uploads/" });
// const upload = multer({ dest: "public/uploads/" });

// router.post("/register", upload.single("profileImage"), registerUser);
// router.post("/login", loginUser);

// module.exports = router;