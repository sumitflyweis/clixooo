const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    booked: { type: Boolean },
    bookingId: { type: mongoose.SchemaTypes.ObjectId, ref: "bookings" },
    projectId: { type: String },
    customer: { type: String },
    service: { type: String },
    start_time: { type: Number },
    end_time: { type: Number },
    date: { type: String },
    location: { type: String },
    now_schedule: { type: String },
    amount: { type: Number },
    status: { type: String },
    rewards: { type: String },
    timer: { type: String },
    paymentMethod: { type: String },
    now_schedule: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("projectList", projectSchema);
