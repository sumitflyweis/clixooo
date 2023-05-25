const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    // UserId: { type: String },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required:false
      // unique: false 
    },
    
    hero: {
      type: mongoose.Schema.ObjectId,
      ref: "hero",
      required:false
      // unique: false
    },
    
   balance:{ type: Number, default: 0 },
   addbalance: { type: Number, default: 0 },
   removebalance: { type: Number, default: 0 },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", walletSchema);