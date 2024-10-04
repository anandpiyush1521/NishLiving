const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../logger");
const { generateToken } = require("../middleware/authMiddleware"); // Import the middleware
const { uploadOnCloudinary } = require("../utils/cloudinary"); // Import Cloudinary helper


// const registerUser = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;
//     const profileImage = req.file;

//     if (!profileImage) {
//       logger.warn("Registration failed: No profile image uploaded.", { endpoint: "/auth/register", email });
//       return res.status(400).send("No file uploaded");
//     }

//     const profileImagePath = profileImage.path;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       logger.warn("User registration failed: User already exists.", { email });
//       return res.status(409).json({ message: "User already exists!" });
//     }

//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       profileImagePath,
//     });
//     await newUser.save();

//     logger.info("User registered successfully.", { userId: newUser._id, firstName, lastName });
//     res.status(200).json({
//       message: "User registered successfully!",
//       user: newUser,
//     });
//   } catch (err) {
//     logger.error("User registration failed.", { error: err.message, stack: err.stack });
//     res.status(500).json({ message: "Registration failed!", error: err.message });
//   }
// };

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       logger.warn("Login failed: User doesn't exist.", { email });
//       return res.status(409).json({ message: "User doesn't exist!" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       logger.warn("Login failed: Invalid credentials.", { email });
//       return res.status(400).json({ message: "Invalid Credentials!" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     delete user.password;

//     logger.info("User logged in successfully.", { userId: user._id, email });
//     res.status(200).json({ token, user });
//   } catch (err) {
//     logger.error("Login failed.", { error: err.message, stack: err.stack });
//     res.status(500).json({ error: err.message });
//   }
// };

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const profileImage = req.file;

    if (!profileImage) {
      logger.warn("Registration failed: No profile image uploaded.", { endpoint: "/auth/register", email });
      return res.status(400).send("No file uploaded");
    }

    // Upload the profile image to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(profileImage.path);
    if (!cloudinaryResponse) {
      logger.error("Image upload failed during registration.", { email });
      return res.status(500).json({ message: "Image upload failed!" });
    }
    
    const profileImageUrl = cloudinaryResponse.url; // Get the Cloudinary URL

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn("User registration failed: User already exists.", { email });
      return res.status(409).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user object with the Cloudinary image URL
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath: profileImageUrl,  // Store the Cloudinary URL here
    });
    await newUser.save();

    logger.info("User registered successfully.", { userId: newUser._id, firstName, lastName });
    res.status(200).json({
      message: "User registered successfully!",
      user: newUser,
    });
  } catch (err) {
    logger.error("User registration failed.", { error: err.message, stack: err.stack });
    res.status(500).json({ message: "Registration failed!", error: err.message });
  }
};




const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn("Login failed: User doesn't exist.", { email });
      return res.status(409).json({ message: "User doesn't exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn("Login failed: Invalid credentials.", { email });
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // Generate token using middleware function
    const token = generateToken(user._id);

    // Remove sensitive info before returning user
    delete user.password;

    logger.info("User logged in successfully.", { userId: user._id, email });
    res.status(200).json({ token, user });
  } catch (err) {
    logger.error("Login failed.", { error: err.message, stack: err.stack });
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
};
