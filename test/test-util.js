import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestContact = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      username: "test",
      first_name: "test",
      email: "test@gmail.com",
      phone: "029292929",
    },
  });
};

export const createManyTestContact = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        username: "test",
        first_name: `test ${i}`,
        lastname: `test ${i}`,
        email: `test${i}@gmail.com`,
        phone: `029292929${i}`,
      },
    });
  }
};

// get id (auto-increment)
export const getTestContact = async () => {
  // mengambil data contact pertama
  return prismaClient.contact.findFirst({
    where: {
      username: "test",
    },
  });
};

// hapus semua address yang memiliki contact dgn username test
export const removeAllTestAddresses = async () => {
  await prismaClient.address.deleteMany({
    where: {
      contact: {
        username: "test",
      },
    },
  });
};

export const createTestAddress = async () => {
  const contact = await getTestContact();
  await prismaClient.address.create({
    data: {
      contact_id: contact.id,
      streat: "Jalan test",
      city: "kota test",
      province: "provinsi test",
      country: "indonesia",
      postal_code: "212345",
    },
  });
};

export const getTestAddress = () => {
  return prismaClient.address.findFirst({
    where: {
      contact: {
        username: "test",
      },
    },
  });
};
