import { sum, sub, mul, div, pow, sqr, rem, sin, cos, tg, ctg, factorial, fibonacci } from "./mathFunctions";

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

test("4 ^ 3 = 64", () => {
    expect(pow(4, 3)).toBe(64);
});

test("4 ** = 16", () => {
    expect(sqr(4)).toBe(16);
});

test("8 % 3 = 2", () => {
    expect(rem(8, 3)).toBe(2);
});

test("sin (PI / 2) = 1", () => {
    expect(sin(Math.PI / 2)).toBe(1);
});

test("cos 0 = 1", () => {
    expect(cos(0)).toBe(1);
});

test("tg 0 = 0", () => {
    expect(tg(0)).toBe(0);
});

test("ctg 0 = Infinity", () => {
    expect(ctg(0)).toBe(Infinity);
});

test("factorial 5 = 120", () => {
    expect(factorial(5)).toBe(120);
});

test("fibonacci 6 = 8", () => {
    expect(fibonacci(6)).toBe(8);
});

test("factorial of negative throws error", () => {
    expect(() => factorial(-1)).toThrowError();
});

test("factorial of non-integer throws error", () => {
    expect(() => factorial(1.5)).toThrowError();
});

test("fibonacci of negative throws error", () => {
    expect(() => fibonacci(-1)).toThrowError();
});

test("fibonacci of non-integer throws error", () => {
    expect(() => fibonacci(1.5)).toThrowError();
});
