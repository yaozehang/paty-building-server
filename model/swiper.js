const mongoose = require("mongoose");

const swiper = new mongoose.Schema(
  {
    title: { 
      type: String,
      required: true
    },
    news: { 
      type: mongoose.SchemaTypes.ObjectId,
      ref:'news',
      required: true
    },
    img: { 
      type: String,
      required: true
    },
    sort: { 
      type: Number,
      default: 1
    },
    status: { 
      type: Number,
      default: 1
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: "create_time", updatedAt: "update_time" }
  }
);

module.exports = mongoose.model("swiper", swiper);
