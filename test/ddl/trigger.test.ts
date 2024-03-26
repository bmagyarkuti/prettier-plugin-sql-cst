import dedent from "dedent-js";
import { test } from "../test_utils";

describe("trigger", () => {
  describe("create trigger", () => {
    it(`formats CREATE TRIGGER .. INSTEAD OF UPDATE OF`, async () => {
      await test(dedent`
        CREATE TRIGGER cust_addr_chng
        INSTEAD OF UPDATE OF cust_addr ON customer_address
        BEGIN
          UPDATE customer
          SET cust_addr = NEW.cust_addr
          WHERE cust_id = NEW.cust_id;
        END
      `);
    });

    it(`formats long UPDATE OF column list`, async () => {
      await test(dedent`
        CREATE TRIGGER cust_addr_chng
        INSTEAD OF UPDATE OF
          cust_address,
          cust_zip_code,
          cust_country,
          super_long_column_name
        ON customer_address
        BEGIN
          DELETE FROM customer;
        END
      `);
    });

    it(`formats TEMPORARY TRIGGER IF NOT EXISTS`, async () => {
      await test(dedent`
        CREATE TEMPORARY TRIGGER IF NOT EXISTS cust_addr_del
        DELETE ON customer_address
        BEGIN
          DELETE FROM customer;
        END
      `);
    });

    it(`formats FOR EACH ROW`, async () => {
      await test(dedent`
        CREATE TRIGGER cust_addr_del
        INSERT ON customer_address
        FOR EACH ROW
        BEGIN
          DELETE FROM customer
          WHERE cust_id = OLD.id;
        END
      `);
    });

    it(`formats WHEN condition`, async () => {
      await test(dedent`
        CREATE TRIGGER cust_addr_del
        INSERT ON customer_address
        FOR EACH ROW
        WHEN priority > 10
        BEGIN
          DELETE FROM customer;
        END
      `);
    });

    it(`formats long WHEN condition`, async () => {
      await test(dedent`
        CREATE TRIGGER cust_addr_del
        INSERT ON customer_address
        WHEN
          customer_address.priority > 10
          AND customer_address.id IS NOT NULL
          AND customer_address.priority < 100
        BEGIN
          DELETE FROM customer;
        END
      `);
    });
  });

  describe("drop trigger", () => {
    it(`formats DROP TRIGGER`, async () => {
      await test(`DROP TRIGGER my_trigger`);
    });

    it(`formats IF EXISTS`, async () => {
      await test(`DROP TRIGGER IF EXISTS my_trigger`);
    });
  });
});
