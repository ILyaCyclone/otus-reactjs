import { parseEquation, tryParseGroup } from "./parser";

test("parses equation into tokens", () => {
    expect(parseEquation("5 * (1 + 2)")).toEqual([5, "*", "(", 1, "+", 2, ")"]);
});

test("parses trigonometrics into tokens", () => {
    expect(parseEquation("sin PI + cos(PI / 2)")).toEqual(["sin", Math.PI, "+", "cos", "(", Math.PI, "/", 2, ")"]);
});

test("parses group", () => {
    const groupStartIndex = 2;
    expect(tryParseGroup([5, "*", "(", 1, "+", 2, ")"], groupStartIndex)).toEqual([1, "+", 2]);
});

test("parses group with subgroups", () => {
    const groupStartIndex = 2;
    // prettier-ignore
    expect(tryParseGroup([5, "*", "(", 1, "+", "(", 3, "*", 5, ")", ")"], groupStartIndex))
        .toEqual([1, "+", "(", 3, "*", 5, ")"]);
});

test("returns null when not a group", () => {
    const groupStartIndex = 1;
    expect(tryParseGroup([5, "*", "(", 1, "+", 2, ")"], groupStartIndex)).toBeNull();
});

test("throws exception if group end symbol is not found", () => {
    const groupStartIndex = 2;
    expect(() => expect(tryParseGroup([5, "*", "(", 1, "+", "(", 3, "*", 5, ")"], groupStartIndex))).toThrowError(
        "invalid equation: missing closing parenthesis"
    );
});
