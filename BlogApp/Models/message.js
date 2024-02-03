const {Schema, model} = require("mongoose");

const messageSchema = new Schema({
    msgSedUserId : {
        type : Schema.Types.ObjectId,
        ref : "users"
    },

    msgRecUserId : {
        type : Schema.Types.ObjectId,
        ref : "users"
    },

    message : String

}, {timestamps : true});

module.exports = new model("messages", messageSchema);