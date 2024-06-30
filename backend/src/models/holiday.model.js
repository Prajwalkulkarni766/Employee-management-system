import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  holidayId: {
    type: String,
    unique: true,
    index: true,
  },
  name: {
    type: String,
    required: [true, "Please provide holiday name"],
  },
  date: {
    type: Date,
    required: [true, "Please provide holiday date"],
  },
  details: {
    type: String,
  },
});

holidaySchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }
  const count = await mongoose.model("Holiday").countDocuments();
  this.holidayId = `HOL-${count + 1}`;
  next();
});

const Holiday = mongoose.model("Holiday", holidaySchema);

export default Holiday;
