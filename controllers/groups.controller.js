const Group = require("../models/Group.model");
const Student = require("../models/Student.model");

module.exports.groupsController = {
  add: async (req, res) => {
    try {
      const { name, onStudy, week } = req.body;
      const group = await Group.create({
        name,
        onStudy,
        week,
      });
      res.json(`Group ${group.name} has been create`);
    } catch (e) {
      res.json(e.message);
    }
  },

  edit: async (req, res) => {
    try {
      const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(group);
    } catch (e) {
      res.json(e.message);
    }
  },

  delete: async (req, res) => {
    await Group.findByIdAndDelete(req.params.id, (err, group) => {
      if (err) return res.json(err);

      res.json(`Group ${group.name} deleted`);
    });
  },

  get: async (req, res) => {
    try {
      const group = await Group.find();
      res.json(group);
    } catch (e) {
      res.json(e.message);
    }
  },

  getGroupPeople: async (req, res) => {
    try {
      const group = await Student.find({ group: req.params.id }).populate(
        "group",
        "name"
      );
      res.json(group);
    } catch (e) {
      res.json(e.message);
    }
  },
  getGroupByWeek: async (req, res) => {
    try {
      const group = await Group.find({ week: req.params.week });
      res.json(group);
    } catch (e) {
      res.json(e.message);
    }
  },
  getFinishedGroup: async (req, res) => {
    try {
      const group = await Group.find({ onStudy: false });
      res.json(group);
    } catch (e) {
      res.json(e.message);
    }
  },
};
