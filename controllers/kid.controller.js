const Kid = require('../models/Kid.model');

module.exports.kidController = {
  getAll: async (req, res) => {
    try {
      const kid = await Kid.aggregate([
        {
          $lookup: {
            from: 'comments',
            as: 'comments',
            let: { client: '$_id' },
            pipeline: [{ $match: { $expr: { $eq: ['$client', '$$client'] } } }],
          },
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            patronymic: 1,
            img: 1,
          },
        },
      ]);
      return res.json(kid);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  getKidId: async (req, res) => {
    const { id } = req.params;
    try {
      const kid = await Kid.findById(id);
      if (!kid) {
        return res.status(400).json({
          error: 'Ребенок с таким ID не найден',
        });
      }
      return res.json(kid);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  postKid: async (req, res) => {
    const { firstName, lastName, patronymic, age, img } = req.body;

    if (!firstName) {
      return res.status(400).json({
        error: 'Необходимо указать имя',
      });
    }
    if (!lastName) {
      return res.status(400).json({
        error: 'Необходимо указать фамилию',
      });
    }
    if (!patronymic) {
      return res.status(400).json({
        error: 'Необходимо указать отчество',
      });
    }
    if (!age) {
      return res.status(400).json({
        error: 'Необходимо указать возраст',
      });
    }
    try {
      const kid = new Kid({
        firstName,
        lastName,
        patronymic,
        age,
        img,
      });
      await kid.save();
      return res.json(kid);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  patchKid: async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, patronymic, age, img } = req.body;
    const option = { new: true };

    if (!firstName) {
      return res.status(400).json({
        error: 'Не удалось изменить имя',
      });
    }
    if (!lastName) {
      return res.status(400).json({
        error: 'Не удалось изменить фамилию',
      });
    }
    if (!patronymic) {
      return res.status(400).json({
        error: 'Не удалось изменить отчество',
      });
    }
    if (!age) {
      return res.status(400).json({
        error: 'Не удалось изменить возраст',
      });
    }
    try {
      const kid = await Kid.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          patronymic,
          age,
          img,
        },
        option
      );

      await kid.save();
      return res.json(kid);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  deleteKid: async (req, res) => {
    const { id } = req.params;
    try {
      const kid = await Kid.findByIdAndDelete({ _id: id });

      if (!kid) {
        return res.status(400).json({
          error: 'Не удалось удалить',
        });
      }
      return res.json(kid);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};
