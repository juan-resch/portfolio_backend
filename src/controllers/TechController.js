const { codes } = require("../utils");
const prisma = require("../../prisma");

module.exports = {
  create: async (req, res) => {
    try {
      const { skillId, workId } = req.body;

      const tech = await prisma.tech.create({ data: { workId, skillId } });

      if (!tech) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Could not create tech" });
      }

      return res.status(codes.CREATED).json({ success: true, data: tech });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { skillId, workId, id } = req.body;

      const oldTech = await prisma.tech.findFirst({
        where: {
          id,
        },
      });

      if (!oldTech) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Tech not found" });
      }

      const tech = await prisma.tech.update({
        data: { workId, skillId },
        where: {
          id,
        },
      });

      return res.status(codes.OK).json({ success: true, data: tech });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  findOne: async (req, res) => {
    try {
      const { id } = req.params;

      const tech = await prisma.tech.findFirst({ where: { id } });

      if (!tech) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Tech not found" });
      }

      return res.status(codes.OK).json({ success: true, data: tech });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  index: async (req, res) => {
    try {
      const techs = await prisma.tech.findMany();

      return res.status(codes.OK).json({ success: true, data: techs });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const oldTech = await prisma.tech.findFirst({
        where: {
          id,
        },
      });

      if (!oldTech) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Tech not found" });
      }

      const deleted_tech = await prisma.tech.delete({ where: { id } });

      return res.status(codes.OK).json({ success: true, data: deleted_tech });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
};
