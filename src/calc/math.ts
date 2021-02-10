export type BinaryFunction = (a: number, b: number) => number;

export const sum: BinaryFunction = (a, b) => a + b;
export const sub: BinaryFunction = (a, b) => a - b;
export const mul: BinaryFunction = (a, b) => a * b;
export const div: BinaryFunction = (a, b) => a / b;
export const pow: BinaryFunction = (a, b) => Math.pow(a, b);
export const rem: BinaryFunction = (a, b) => a % b;
