import * as math from "./math";


const mathBinaryFunctions: Record<string, math.BinaryFunction> = {
    "+": math.sum,
    "-": math.sub,
    "*": math.mul,
    "/": math.div,
    "^": math.pow,
    "%": math.rem
};


export const evaluate = (equation: string): number => {
    const parts: string[] = equation.split(" ");

    const arg1: number = parseFloat(parts[0]);
    const operator: string = parts[1];
    const arg2: number = parseFloat(parts[2]);

    const mathBinaryFunction: math.BinaryFunction = mathBinaryFunctions[operator];

    const result: number = mathBinaryFunction(arg1, arg2);

    return result;
}