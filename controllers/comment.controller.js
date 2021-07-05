const Comment = require('../models/Comment.model');

module.exports.commentController = {
  commentAll: async (req, res) => {
    try {
      const comment = await Comment.find({});
      return res.json(comment);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  commentId: async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await Comment.findById(id);

      if (!comment) {
        return res.status(400).json({
          error: 'Категория с таким ID не найдена',
        });
      }

      return res.json(comment);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  postComment: async (req, res) => {
    const { comments } = req.body;

    if (!comments) {
      return res.status(400).json({
        error: 'Комментария не указана',
      });
    }

    try {
      const comment = new Comment({ comments });
      await comment.save();
      return res.json(comment);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  patchComment: async (req, res) => {
    const { id } = req.params;
    const { comments } = req.body;
    const options = { new: true };
    if (!comments) {
      return res.status(400).json({
        error: 'Не удалось изменить комментарии',
      });
    }
    try {
      const comment = await Comment.findByIdAndUpdate(
        id,
        { comments },
        options
      );
      await comment.save();
      return res.json(comment);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};
