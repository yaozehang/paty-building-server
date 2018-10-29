const mongoose = require('mongoose')

const common = new mongoose.Schema({
  content: String,
  user:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"admin_user"
  },
  topic:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"topic"
  }
}, {versionKey:false, timestamps: {createdAt: 'create_time', updatedAt: 'update_time'} })

module.exports = mongoose.model('common',common) 
