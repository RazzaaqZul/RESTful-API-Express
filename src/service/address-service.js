import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation,
} from "../validation/address-validation.js";
import { getContactValidation } from "../validation/contact-validation.js";
import { validate } from "../validation/validation.js";

const create = async (user, contactId, request) => {
  // melakukan validasi request

  contactId = validate(getContactValidation, contactId);

  // tidak butuh data contact, hanya perlu mengecek ada atau tidak. Findfirest()
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  // validasi
  const address = validate(createAddressValidation, request);
  // jika valid, tambahkan field contact_id
  address.contact_id = contactId;
  return await prismaClient.address.create({
    data: address,
    select: {
      id: true,
      streat: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const get = async (user, contactId, addressId) => {
  contactId = validate(getContactValidation, contactId);

  // tidak butuh data contact, hanya perlu mengecek ada atau tidak. Findfirest()
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });
  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  addressId = validate(getAddressValidation, addressId);

  const address = await prismaClient.address.findFirst({
    where: {
      contact_id: contactId,
      id: addressId,
    },
    select: {
      id: true,
      streat: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });

  if (!address) {
    throw new ResponseError(404, "address is not found");
  }

  return address;
};

const update = async (user, contactId, request) => {
  contactId = validate(getContactValidation, contactId);

  // tidak butuh data contact, hanya perlu mengecek ada atau tidak. Findfirest()
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  const address = validate(updateAddressValidation, request);

  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: address.id,
    },
  });

  console.log("MASUK BANG");

  if (totalAddressInDatabase !== 1) {
    throw new ResponseError(404, "Address is not found");
  }
  // kenapa update many? karena kita nambahin contactId
  // balikan berupa counter, dan ga bisa di select
  return prismaClient.address.update({
    where: {
      id: address.id,
    },
    data: {
      streat: address.streat,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
    },
    select: {
      id: true,
      streat: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

const remove = async (user, contactId, addressId) => {
  contactId = validate(getContactValidation, contactId);

  // tidak butuh data contact, hanya perlu mengecek ada atau tidak. Findfirest()
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  addressId = validate(getAddressValidation, addressId);

  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contact_id: contactId,
      id: addressId,
    },
  });

  if (totalAddressInDatabase !== 1) {
    throw new ResponseError(404, "address not found");
  }

  return prismaClient.address.delete({
    where: {
      id: addressId,
    },
  });
};

const list = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId);

  // tidak butuh data contact, hanya perlu mengecek ada atau tidak. Findfirest()
  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId,
    },
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "contact is not found");
  }

  return prismaClient.address.findMany({
    where: {
      contact_id: contactId,
    },
    select: {
      id: true,
      streat: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    },
  });
};

export default { create, get, update, remove, list };
