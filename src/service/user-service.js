import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

// TODO:
const register = async (request) => {
  // melakukan validasi
  const user = validate(registerUserValidation, request);

  // apakah user telah ada?
  // check di database menggunakan prisma
  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  // Jika ada
  if (countUser === 1) throw new ResponseError(400, "Username already exists");

  // Jika tidak ada, Simpan
  // sebelum disimpan, lakukan Hashing pada password dengan kompleksitas 10
  user.password = await bcrypt.hash(user.password, 10);

  return await prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
      // password tidak perlu
    },
  });
};

// TODO:
const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  // pengecekan db
  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  // jika user tidak ada
  if (!user) {
    throw new ResponseError(401, "Username or Password Wrong");
  }

  // jika ketemu
  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  // Jika gagal
  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password wrong");
  }

  // kalau valid
  // bikin token
  const token = uuid().toString();

  // simpan ke db
  return await prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      username: user.username,
    },
    select: {
      // token dikembalikan ke user
      token: true,
    },
  });
};

// TODO:
const get = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      name: true,
      contacts: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return user;
};

// TODO:
const update = async (request) => {
  const user = validate(updateUserValidation, request);

  // mencari username yang sama
  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  // jika tidak ada
  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, "");
  }
  const data = {};
  if (user.name) {
    data.name = user.name;
  }

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return await prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: data,
    select: {
      username: true,
      name: true,
    },
  });
};

//TODO:
const logout = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return prismaClient.user.update({
    where: {
      username: username,
    },
    data: {
      token: null,
    },
    select: {
      username: true,
    },
  });
};
export default { register, login, get, update, logout };
