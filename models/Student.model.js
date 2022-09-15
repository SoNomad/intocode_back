const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: String,
  payStatus: String, // 0% - 50% - 100%
  notes: [{ type: String }],
  group: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Group",
  },
  status: String,
  // "Is studying" -- "study"
  // "Looking for a job" -- "searching"
  // "Recieved an offer" -- "offered"
  // "Got a job" -- "working"
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
