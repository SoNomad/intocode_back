const Group = require("../models/Group.model");
const Student = require("../models/Student.model");

module.exports.groupsController = {
  //создать группу
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
  //редактирование группы по айди
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
  //удаление группы по айди
  delete: async (req, res) => {
    await Group.findByIdAndDelete(req.params.id, (err, group) => {
      if (err) return res.json(err);

      res.json(`Group ${group.name} deleted`);
    });
  },
  //показать все группы
  get: async (req, res) => {
    try {
      const group = await Group.find();
      res.json(group);
    } catch (e) {
      res.json(e.message);
    }
  },
  //показать студентов определенной по айди группы
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
  //покзаать группы по неделе обучения
  getGroupByWeek: async (req, res) => {
    try {
      const group = await Group.find({ week: req.params.week });
      res.json(group);
    } catch (e) {
      res.json(e.message);
    }
  },
  //показать группы, завершившие обучение
  getFinishedGroup: async (req, res) => {
    try {
      const group = await Group.find({ onStudy: false });
      res.json(group);
    } catch (e) {
      res.json(e.message);
    }
  },
};
