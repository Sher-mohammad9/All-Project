const app = require("../app")
const messageModel = require("../Models/message");
const {Server} = require("socket.io");
const http = require("http");


const server = http.createServer(app);
const io = new Server(server);


io.on("connection", (socket)=>{
    socket.on("message", async (msgData)=>{
        let userMessage = {
            msgSedUserId : msgData.userId[0],
            msgRecUserId : msgData.userId[1],
            message : msgData.message
        }
         await messageModel.create(userMessage);
                 io.emit("message", msgData.message);
    })
})

module.exports = server;