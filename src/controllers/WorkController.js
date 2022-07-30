const { codes } = require("../utils");
const prisma = require("../../prisma");

module.exports = {
  create: async (req, res) => {
    try {
      const { name, description, userId } = req.body;

      const work = await prisma.work.create({
        data: { name, description, userId },
      });

      if (!work) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Could not create work" });
      }

      return res.status(codes.CREATED).json({ success: true, data: work });
    } catch (error) {
      console.log(error);
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { name, description, id } = req.body;

      const oldWork = await prisma.work.findFirst({ where: { id } });

      if (!oldWork) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Work not found" });
      }

      const work = await prisma.work.update({
        data: { name, description, updatedAt: new Date() },
        where: { id },
      });

      return res.status(codes.CREATED).json({ success: true, data: work });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  findOne: async (req, res) => {
    try {
      const { id } = req.params;

      const work = await prisma.work.findFirst({ where: { id } });

      if (!work) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Work not found" });
      }

      return res.status(codes.OK).json({ success: true, data: work });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  index: async (req, res) => {
    try {
      const works = await prisma.work.findMany();

      return res.status(codes.OK).json({ success: true, data: works });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const oldWork = await prisma.work.findFirst({ where: { id } });

      if (!oldWork) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Work not found" });
      }

      const deleted_work = await prisma.work.delete({ where: { id } });

      return res.send(codes.OK).json({ success: true, data: deleted_work });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
};
