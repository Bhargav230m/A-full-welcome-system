const {model, Schema} = require('mongoose');

let leaveSchema = new Schema({
    Guild: String,
    Channel: String,
    Msg: String,
});

module.exports = model("leave", leaveSchema);