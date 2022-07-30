const { codes } = require("../utils");
const prisma = require("../../prisma");

module.exports = {
  create: async (req, res) => {
    try {
      const { type, postId, userId } = req.body;

      const reaction = await prisma.postReaction.create({
        data: {
          type,
          postId,
          userId,
        },
      });

      if (!reaction) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Error creating reaction" });
      }

      return res.status(codes.CREATED).json({ success: true, data: reaction });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { type, postId, userId, id } = req.body;

      const old_reaction = await prisma.postReaction.findFirst({
        where: {
          id,
        },
      });

      if (!old_reaction) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Reaction not found" });
      }

      const reaction = await prisma.postReaction.update({
        data: {
          type,
          postId,
          userId,
          updatedAt: new Date(),
        },
        where: {
          id,
        },
      });

      return res.status(codes.OK).json({ success: true, data: reaction });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  findOne: async (req, res) => {
    try {
      const { id } = req.params;

      const reaction = await prisma.postReaction.findFirst({ where: { id } });

      if (!reaction) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Reaction not found" });
      }

      return res.status(codes.OK).json({ success: true, data: reaction });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  index: async (req, res) => {
    try {
      const reactions = await prisma.postReaction.findMany();

      return res.status(codes.OK).json({ success: true, data: reactions });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deleted_reaction = await prisma.postReaction.delete({
        where: { id },
      });

      if (!deleted_reaction) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Could not delete reaction" });
      }

      return res
        .status(codes.OK)
        .json({ success: true, data: deleted_reaction });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
};
