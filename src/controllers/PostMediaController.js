const { codes } = require("../utils");
const prisma = require("../../prisma");

module.exports = {
  create: async (req, res) => {
    try {
      const { path, postId } = req.body;

      const media = await prisma.postMedia.create({
        data: {
          path,
          postId,
        },
      });

      if (!media) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Media not found" });
      }

      return res.status(codes.CREATED).json({ success: true, data: media });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { path, postId, id } = req.body;

      const old_media = await prisma.postMedia.findFirst({
        where: {
          id,
        },
      });

      if (!old_media) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Media not found" });
      }

      const media = await prisma.postMedia.update({
        data: {
          path,
          postId,
        },
        where: {
          id,
        },
      });

      return res.status(codes.OK).json({ success: true, data: media });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  findOne: async (req, res) => {
    try {
      const { id } = req.params;

      const media = await prisma.postMedia.findFirst({
        where: {
          id,
        },
      });

      if (!media) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Media not found" });
      }

      return res.status(codes.OK).json({ success: true, data: media });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  index: async (req, res) => {
    try {
      const medias = await prisma.postMedia.findMany();

      return res.status(codes.OK).json({ success: true, data: medias });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const old_media = await prisma.postMedia.findFirst({ where: { id } });

      if (!old_media) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Media not found" });
      }

      const deleted_media = await prisma.postMedia.delete({ where: { id } });

      return res.status(codes.OK).json({ success: true, data: deleted_media });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
};
