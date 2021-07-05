const Status = require('../models/Status.model');

module.exports.statusController = {
  allStatus: async (req, res) => {
    try {
      const status = await Status.find({});
      return res.json(status);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  idStatus: async (req, res) => {
    const { id } = req.params;
    try {
      const status = await Status.findById(id);
      if (!status) {
        return res.status(400).json({
          error: 'Статус с таким ID не найдена',
        });
      }
      return res.json(status);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  postStatus: async (req, res) => {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        error: 'Необходимо указать статус',
      });
    }
    try {
      const stat = new Status({ status });
      await stat.save();
      return res.json(stat);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  patchStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const option = { new: true };

    if (!status) {
      return res.status(400).json({
        error: 'Не удалось изменить статус',
      });
    }
    try {
      const stat = await Status.findByIdAndUpdate(id, { status }, option);
      await stat.save();
      return res.json(stat);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};
