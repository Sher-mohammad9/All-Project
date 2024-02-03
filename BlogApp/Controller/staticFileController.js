const userModel = require("../Models/userModel");
const messageModel = require("../Models/message")

// Render signup page
exports.signupPage = (req, resp)=>{
    resp.render("signup");
}

// Render login page
exports.loginPage = (req, resp)=>{
    resp.render("login");
}

// User logout handle
exports.logoutUser = (req, resp)=>{
    const clearCoo = resp.clearCookie("token").redirect("/home")
}

// Render profile operator
exports.profileOperator = (req, resp)=>{
    resp.render("profileOperator", {user : req.user})
}

// Render profile page
exports.updateProfile = (req, resp)=>{
    resp.render("profile", {user : req.user});
}

// Render chat page
exports.usersPage = async(req, resp)=>{
    const users = await userModel.find()
    resp.render("appUsers", {users, user : req.user})
}

// Render chat page
exports.chatPage = async (req, resp)=>{
    const chatUser = await userModel.findById(req.params.id);
    let messages = await messageModel.find({$or : [{msgSedUserId : req.user._id}, {msgRecUserId : req.user._id}]});
    const msg = [];
    const bothMsg = messages.forEach(msgObj => {
        if((JSON.stringify(msgObj.msgRecUserId) === JSON.stringify(chatUser._id)
        && JSON.stringify(msgObj.msgSedUserId) === JSON.stringify(req.user._id))
        || (JSON.stringify(msgObj.msgRecUserId) === JSON.stringify(req.user._id)
        && JSON.stringify(msgObj.msgSedUserId) === JSON.stringify(chatUser._id))){
            msg.push(msgObj)
        }
    })
    messages = msg
    resp.render("chats", {user : req.user, chatUser, messages,});  
}
