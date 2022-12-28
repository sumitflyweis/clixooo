const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    // UserId: { type: String },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      unique: true,    
      required: true,
    },
    
    
    balance: { type: String, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", walletSchema);