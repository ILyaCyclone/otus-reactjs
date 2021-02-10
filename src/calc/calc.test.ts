import { evaluate } from "./calc";

test("1 + 2 = 3", () => {
  expect(evaluate("1 + 2")).toBe(3);
});

test("6 - 4 = 2", () => {
  expect(evaluate("6 - 4")).toBe(2);
});

test("5 * 3 = 15", () => {
  expect(evaluate("5 * 3")).toBe(15);
});

test("10 / 5 = 2", () => {
  expect(evaluate("10 / 5")).toBe(2);
});

test("4 ^ 2 = 16", () => {
  expect(evaluate("4 ^ 2")).toBe(16);
});

test("8 % 3 = 2", () => {
  expect(evaluate("8 % 3")).toBe(2);
});