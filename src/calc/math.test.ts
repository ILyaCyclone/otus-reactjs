import { sum, sub, mul, div, pow, rem } from "./math";

test("1 + 2 = 3", () => {
    expect(sum(1, 2)).toBe(3);
});

test("6 - 4 = 2", () => {
    expect(sub(6, 4)).toBe(2);
});

test("5 * 3 = 15", () => {
    expect(mul(5, 3)).toBe(15);
});

test("10 / 5 = 2", () => {
    expect(div(10, 5)).toBe(2);
});

test("4 ^ 2 = 16", () => {
    expect(pow(4, 2)).toBe(16);
});

test("8 % 3 = 2", () => {
    expect(rem(8, 3)).toBe(2);
});
