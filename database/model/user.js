const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  userName: {
    type: String,
    require: true
  },
  password: {
    type:String,
  }
});

module.exports = mongose.model('user',user) 
