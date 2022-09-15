const Student = require("../models/Student.model");

module.exports.studentsController = {
  add: async (req, res) => {
    try {
      const { name, payStatus, notes, group, status } = req.body;
      const student = await Student.create({
        name,
        payStatus,
        notes,
        group,
        status,
      });
      res.json(student);
    } catch (e) {
      res.json(e);
    }
  },

  edit: async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(student);
    } catch (e) {
      res.json(e.message);
    }
  },

  delete: async (req, res) => {
    await Student.findByIdAndDelete(req.params.id, (err, student) => {
      if (err) return res.json(err);

      res.json(`Student ${student.name} deleted`);
    });
  },

  getAll: async (req, res) => {
    try {
      const student = await Student.find({}, { name: 1, group: 1 }).populate(
        "group",
        "name"
      );
      res.json(student);
    } catch (e) {
      res.json(e);
    }
  },
  addNote: async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(
        req.params.id,
        {
          $push: { notes: req.body.text },
        },
        { new: true }
      );
      res.json(student);
    } catch (e) {
      res.json(e.message);
    }
  },

  getSudentNote: async (req, res) => {
    try {
      const notes = await Student.findById(req.params.id, {
        name: 1,
        notes: 1,
      });
      res.json(notes);
    } catch (e) {
      res.json(e);
    }
  },
  getStudentByPayStatus: async (req, res) => {
    try {
      const student = await Student.find({ payStatus: req.params.paystatus });
      res.json(student);
    } catch (e) {
      res.json(e);
    }
  },
  getStudentByStatus: async (req, res) => {
    try {
      const student = await Student.find(
        { status: req.params.status },
        { name: 1, group: 1, status: 1 }
      ).populate("group", "name week");

      res.json(student);
    } catch (e) {
      res.json(e);
    }
  },
  getOffered: async (req, res) => {
    try {
      const groupArr = await Student.find({ group: req.params.id });
      const offered = await Student.find({
        group: req.params.id,
        status: "offered",
      });
      const offered_percent = (offered.length / groupArr.length) * 100;
      res.json(offered_percent + "%");
    } catch (e) {
      res.json(e.message);
    }
  },
};
