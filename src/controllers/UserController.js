const { codes } = require("../utils");
const prisma = require("../../prisma/");

module.exports = {
  create: async (req, res) => {
    try {
      const { firstName, lastName, birtyday, photo, email, password } =
        req.body;

      const oldUser = await prisma.user.findFirst({ where: { email } });

      if (oldUser) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "User already exists" });
      }

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          birtyday,
          photo,
          email,
          password,
        },
      });

      return res.status(codes.CREATED).json({ success: true, data: user });
    } catch (error) {
      console.log(error);
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { firstName, lastName, birtyday, photo, email, password, id } =
        req.body;

      const oldUser = await prisma.user.findFirst({ where: { id } });

      if (!oldUser) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "User not found" });
      }

      const user = await prisma.user.update({
        where: { id },
        data: {
          firstName,
          lastName,
          birtyday,
          photo,
          email,
          password,
          updatedAt: new Date(),
        },
      });

      return res.status(codes.OK).json({ success: true, data: user });
    } catch (error) {
      console.log(error);
      res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  findOne: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await prisma.user.findFirst({
        where: { id },
      });

      if (!user) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "User not found" });
      }

      return res.status(codes.OK).json({ success: true, data: user });
    } catch (error) {
      console.log(error);
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await prisma.user.delete({ where: { id } });

      if (!user) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ success: false, error: "User not found" });
      }

      user.password = undefined;
      user.lastName = undefined;

      return res.status(codes.OK).json({ success: true, data: user });
    } catch (error) {
      console.log(error);
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
  index: async (req, res) => {
    try {
      const users = await prisma.user.findMany();

      return res.status(codes.OK).json({ success: true, data: users });
    } catch (error) {
      console.log(error);
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ success: false, error: error.message });
    }
  },
};
