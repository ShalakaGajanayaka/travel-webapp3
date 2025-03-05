const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    walletAddress: {
      type: String,
      required: true,
      trim: true,
    },
    network: {
      type: String,
      enum: ["TRC20", "ERC20", "BTC"],
      required: true,
    },
    cryptoType: {
      type: String,
      enum: ["USDT", "USDC", "ETH", "BTC"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", WalletSchema);
