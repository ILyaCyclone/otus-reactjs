export type BinaryFunction = (x: number, y: number) => number;
export type UnaryFunction = (x: number) => number;

export const sum: BinaryFunction = (x, y) => x + y;
export const sub: BinaryFunction = (x, y) => x - y;
export const mul: BinaryFunction = (x, y) => x * y;
export const div: BinaryFunction = (x, y) => x / y;
export const pow: BinaryFunction = Math.pow;
export const rem: BinaryFunction = (x, y) => x % y;

export const sin: UnaryFunction = Math.sin;
export const cos: UnaryFunction = Math.cos;
export const tg: UnaryFunction = Math.tan;
export const ctg: UnaryFunction = (x) => 1 / Math.tan(x);

export const factorial: UnaryFunction = (x: number) => (x <= 0 ? 1 : x * factorial(x - 1));
export const sqr: UnaryFunction = (x: number) => Math.pow(x, 2);

export const fibonacci: UnaryFunction = (x: number) => {
    let prev = 0;
    let next = 1;
    for (let i = 0; i < x; i++) {
        const temp: number = next;
        next = prev + next;
        prev = temp;
    }
    return prev;
};
