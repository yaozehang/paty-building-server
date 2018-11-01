const mongoose = require("mongoose");

const topic = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "admin_user"
    },
    content: {
      type: String,
      require: true
    },
    common: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "common"
      }
    ]
  },
  {
    versionKey: false,
    timestamps: { createdAt: "create_time", updatedAt: "update_time" }
  }
);

module.exports = mongoose.model("topic", topic);
