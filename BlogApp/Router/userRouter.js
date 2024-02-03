const express = require("express");
const userController = require("../Controller/userController.js");
const {fileUploadHandler} = require("../Middleware/handleFileImages.js");
const Router = express.Router();

// User signup handler
Router.route("/signup").post(userController.signupUser);
// User login handler
Router.route("/login").post(userController.logInUser);
// User update profile handler
Router.route("/update-profile").post(fileUploadHandler, userController.updateProfile);
// Remove user profile photo 
Router.route("/remove-profile/:id").post(userController.removeProfilePhoto)


module.exports = Router;