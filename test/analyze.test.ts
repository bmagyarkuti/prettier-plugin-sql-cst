import { test } from "./test_utils";

describe("analyze", () => {
  it(`formats ANALYZE statement`, async () => {
    test(`ANALYZE my_schema.my_table`);
  });

  it(`formats plain ANALYZE statement`, async () => {
    test(`ANALYZE`);
  });
});
