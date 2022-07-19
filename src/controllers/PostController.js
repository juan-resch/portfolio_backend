const { codes } = require("../utils");
const prisma = require("../../prisma");

module.exports = {
  create: async (req, res) => {
    try {
      const { title, description, text, userId } = req.body;

      const post = await prisma.post.create({
        data: {
          description,
          text,
          title,
          userId,
        },
      });

      return res.status(codes.CREATED).json({ sucess: true, data: user });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ sucess: false, error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const { id, title, description, text, userId } = req.body;

      const oldPost = await prisma.post.findFirst({
        where: {
          id,
        },
      });

      if (!oldPost) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ sucess: false, error: "Post not found" });
      }

      const post = await prisma.post.update({
        data: {
          description,
          text,
          title,
          userId,
          updatedAt: new Date(),
        },
        where: {
          id,
        },
      });

      return res.status(codes.CREATED).json({ sucess: true, data: post });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ sucess: false, error: error.message });
    }
  },
  findOne: async (req, res) => {
    try {
      const { id } = req.params;

      const post = await prisma.post.findFirst({ where: { id } });

      if (!post) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ sucess: false, error: "Post not found" });
      }

      return res.status(codes.OK).json({ sucess: true, data: post });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ sucess: false, error: error.message });
    }
  },
  index: async (req, res) => {
    try {
      const posts = await prisma.post.findMany();

      return res.status(codes.OK).json({ sucess: true, data: posts });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ sucess: false, error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedPost = await prisma.post.delete({ where: { id } });

      if (!deletedPost) {
        return res
          .status(codes.BAD_REQUEST)
          .json({ sucess: false, error: "Post not found" });
      }

      return res.status(codes.CREATED).json({ sucess: true, data: post });
    } catch (error) {
      return res
        .status(codes.INTERNAL_SERVER_ERROR)
        .json({ sucess: false, error: error.message });
    }
  },
};
