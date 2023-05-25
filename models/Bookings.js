const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const bookingSchema = mongoose.Schema(
  {
    cancellable: { type: Boolean },
    booked: { type: Boolean },
    userId: { type: objectid, ref: "user" },
    userobject: { type: Object },
    location: { type: String },
    Date: { type: String, default: new Date() },
    combinedobject: { type: Object },
    //  heroId: { type: [objectid], ref: "hero" },
    heroId: { type: objectid, ref: "hero" },
    heroobject: { type: Object },
    categoryStatus: { type: String },
    Time: { type: String },
    Status: {
      type: String,
      default: "pending",
    },
    amount: { type: Number, default: 0 },
    payment: {
      type: String,
      enum: ["online", "cash"],
      default: "online",
    },
    service: { type: String },
    start_time: { type: String },
    end_time: { type: String },
    now_schedule: { type: String },
    rewards: { type: String },
    timer: { type: String },
    location: {type: String}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookings", bookingSchema);
