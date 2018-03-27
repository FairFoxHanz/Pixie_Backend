const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
  name: String,
  place: String,
  eventDate: Date,
  _user: { type: Schema.Types.ObjectId, ref: "User" },
});

mongoose.model("events", eventSchema);
