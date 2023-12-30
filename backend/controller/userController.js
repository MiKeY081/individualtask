import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { comparePassword } from "../config.js/bcrypt.js";
import { prisma } from "../config.js/prismaCongfig.js";

const userRegister = async (req, res) => {
  const { name, email, password, image } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, image },
    });
    res.send({
      success: true,
      message: "User created",
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        task: true,
      },
    });

    const passwordCheck = await comparePassword(password, user.password);
    if (passwordCheck) {
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "2d" }
      );
      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .send({
          success: true,
          message: "Login successfull",
          user,
        });
    } else {
      res.send({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const { name, email, image } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { name, email, image },
    });
    res.send({
      success: true,
      message: "User updated",
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({ where: { id } });
    res.json({
      success: true,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

export { userRegister, userLogin, updateUser, deleteUser };
