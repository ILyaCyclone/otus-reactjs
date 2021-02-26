import { evaluate } from "./calc";

describe("calc basic expressions", () => {
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

    test("4 ! = 24", () => {
        expect(evaluate("4 !")).toBe(24);
    });

    test("fib 6 = 8", () => {
        expect(evaluate("fib 6")).toBe(8);
    });

    test("cos PI = -1", () => {
        expect(evaluate("cos PI")).toBe(-1);
    });
});

describe("calc complex expressions", () => {
    test("2 - 3 * 4 = -10", () => {
        expect(evaluate("2 - 3 * 4")).toBe(-10);
    });

    test("2 * (3 + 5) = 16", () => {
        expect(evaluate("2 * (3 + 5)")).toBe(16);
    });

    test("sin (PI / 2) + cos 0 = 2", () => {
        expect(evaluate("sin ( PI / 2 ) + cos 0")).toBe(2);
    });

    test("2 * (3 - (4 + 5)) * 2 = -24", () => {
        expect(evaluate("2 * (3 - (4 + 5)) * 2")).toBe(-24);
    });
});

describe("calc relevant error message", () => {
    test('5 + a - unknown token "a"', () => {
        expect(() => evaluate("5 + a")).toThrowError('invalid expression: unknown token "a"');
    });

    test("1 + 2 10 - unknown tokens left", () => {
        expect(() => evaluate("1 + 2 10")).toThrowError('invalid expression: unknown tokens left "3,10"');
    });
});
