const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
  name: Number,
  onStudy: Boolean,
  week: Number,
  //students: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Student" }],
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
