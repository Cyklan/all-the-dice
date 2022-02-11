import { roll } from ".";

test("never get a result lower than 1", () => {
  const results = [];

  for (let i = 0; i < 1000; i++) {
    const result = roll("1d20");
    results.push(result);
  }

  expect(results.filter((x) => x < 0).length).toBe(0);
});

test("never get a result higher than the specified dice", () => {
  const results = [];

  for (let i = 0; i < 1000; i++) {
    const result = roll("1d20");
    results.push(result);
  }
  expect(results.filter((x) => x > 20).length).toBe(0);
});

test("throw error on wrong math operator", () => {
  expect(() => roll("1d20+")).toThrow();
  expect(() => roll("")).toThrow();
  expect(() => roll("1d20 . 5")).toThrow()
}) 