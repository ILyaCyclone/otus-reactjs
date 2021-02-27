import * as mathFunctions from "./mathFunctions";

export const operatorBinaryFunctions: Record<string, mathFunctions.BinaryFunction> = {
    "+": mathFunctions.sum,
    "-": mathFunctions.sub,
    "*": mathFunctions.mul,
    "/": mathFunctions.div,
    "^": mathFunctions.pow,
    "%": mathFunctions.rem
};

export const operatorUnaryInfixFunctions: Record<string, mathFunctions.UnaryFunction> = {
    "sin": mathFunctions.sin,
    "cos": mathFunctions.cos,
    "tg": mathFunctions.tg,
    "ctg": mathFunctions.ctg,
    "fib": mathFunctions.fibonacci
};

export const operatorUnaryPostfixFunctions: Record<string, mathFunctions.UnaryFunction> = {
    "!": mathFunctions.factorial,
    "**": mathFunctions.sqr
};

// prettier-ignore
export const operatorPriorities: string[][] = [
    ["!"],
    ["**", "^"],
    ["fib", "sin", "cos", "tg", "ctg"],
    [ "*", "/", "%"],
    ["+", "-"]
]
