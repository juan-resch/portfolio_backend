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
          .json({ sucess: false, error: "User already exists" });
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

      return res.status(codes.CREATED).json({ sucess: true, data: user });
    } catch (error) {
      console.log(error);
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ sucess: false, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ sucess: false, error: error.message });
    }
  },
  findOne: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ sucess: false, error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ sucess: false, error: error.message });
    }
  },
  index: async (req, res) => {
    try {
      const users = await prisma.user.findMany();

      return res.status(codes.OK).json({ sucess: true, data: users });
    } catch (error) {
      console.log(error);
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ sucess: false, error: error.message });
    }
  },
};
