import supertest from "supertest";
import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";

import {
  createManyTestContact,
  createTestContact,
  createTestUser,
  getTestContact,
  getTestUser,
  removeAllTestContact,
  removeTestUser,
} from "./test-util.js";

describe("POST /api/contacts", () => {
  // Membuat user
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can create new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "test",
        lastname: "test",
        email: "test@gmail.com",
        phone: "080899",
      });
    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("test");
    expect(result.body.data.lastname).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");

    expect(result.body.data.phone).toBeDefined();
  }, 10000);

  it("should can reject new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "",
        lastname: "test",
        email: "test",
        phone: "080899",
      });
    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts", () => {
  // Membuat user
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can get contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe(testContact.first_name);
    expect(result.body.data.lastname).toBe(testContact.lastname);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBeDefined();
  });
  it("should return 404 if contact is not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + 1)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can update existing contact", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "Radit",
        lastname: "Zulkahfi",
        email: "zulkahfi@gmail.com",
        phone: "0999999",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe("Radit");
    expect(result.body.data.lastname).toBe("Zulkahfi");
    expect(result.body.data.email).toBe("zulkahfi@gmail.com");
    expect(result.body.data.phone).toBeDefined();
  });

  it("should reject if request is invalid", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put("/api/contacts/" + testContact.id)
      .set("Authorization", "test")
      .send({
        first_name: "",
        lastname: "",
        email: "",
        phone: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject if contact not found", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put("/api/contact/" + testContact.id + 1)
      .set("Authorization", "test")
      .send({
        first_name: "Radit",
        lastname: "Zulkahfi",
        email: "zulkahfi@gmail.com",
        phone: "0999999",
      });

    expect(result.status).toBe(404);
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can delete contact", async () => {
    let testContact = await getTestContact();
    // console.error(testContact.id);
    const result = await supertest(web)
      .delete("/api/contacts/" + testContact.id)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    // cek jika contact masih ada tau tidak
    testContact = await getTestContact();
    expect(testContact).toBeNull();
  });
  it("should reject if contact is not found", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete("/api/contacts/" + (testContact.id + 1))
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("GET /api/contacts/:params", () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it(`should can search without parameter`, async () => {
    const result = await supertest(web)
      .get("/api/contacts/")
      .set("Authorization", "test");

    // default

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it(`should can search to page 2`, async () => {
    const result = await supertest(web)
      .get("/api/contacts/")
      .query({ page: 2 })
      .set("Authorization", "test");

    // default

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it(`should can search to page 2`, async () => {
    const result = await supertest(web)
      .get("/api/contacts/")
      .query({ name: "1" })
      .set("Authorization", "test");

    // default

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it(`should can search using name`, async () => {
    const result = await supertest(web)
      .get("/api/contacts/")
      .query({ page: 2 })
      .set("Authorization", "test");

    // default

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it(`should can search using email`, async () => {
    const result = await supertest(web)
      .get("/api/contacts/")
      .query({ email: "test1" })
      .set("Authorization", "test");

    // default

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });

  it(`should can search using phone`, async () => {
    const result = await supertest(web)
      .get("/api/contacts/")
      .query({ phone: "0292929291" })
      .set("Authorization", "test");

    // default

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(6);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(6);
  });
});
