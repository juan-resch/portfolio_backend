const { codes } = require("../utils");
const prisma = require("../../prisma");

module.exports = {
  create: async (req, res) => {
    try {
      const { name, icon, color, role } = req.body;

      const skill = await prisma.skill.create({
        data: { name, icon, role, color },
      });

      if (!skill) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Could not create skill" });
      }

      return res.status(codes.CREATED).json({ success: true, data: skill });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { name, icon, color, role, id } = req.body;

      const old_skill = await prisma.skill.findFirst({
        where: { id },
      });

      if (!old_skill) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Skill not found" });
      }

      const skill = await prisma.skill.update({
        data: { name, icon, color, role },
        where: { id },
      });

      return res.status(codes.OK).json({ success: true, data: skill });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  findOne: async (req, res) => {
    try {
      const { id } = req.params;

      const skill = await prisma.skill.findFirst({ where: { id } });

      if (!skill) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Skill not found" });
      }

      return res.status(codes.OK).json({ success: true, data: skill });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  index: async (req, res) => {
    try {
      const skills = await prisma.skill.findMany();

      return res.status(codes.OK).json({ success: true, data: skills });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const skill = await prisma.skill.findFirst({ where: { id } });

      if (!skill) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "Skill not found" });
      }

      const deleted_skill = await prisma.skill.delete({ where: { id } });

      return res.status(codes.OK).json({ success: true, data: deleted_skill });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
};
