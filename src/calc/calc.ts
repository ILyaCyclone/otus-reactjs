import * as math from "./math";


const mathBinaryFunctions: Record<string, math.BinaryFunction> = {
    "+": math.sum,
    "-": math.sub,
    "*": math.mul,
    "/": math.div,
    "^": math.pow,
    "%": math.rem
};

const mathUnaryInfixFunctions: Record<string, math.UnaryFunction> = {
    "sin": math.sin,
    "cos": math.cos,
    "tg": math.tg,
    "ctg": math.ctg,
    "fib": math.fibonacci
};

const mathUnaryPostfixFunctions: Record<string, math.UnaryFunction> = {
    "!": math.factorial,
    "**": math.sqr
};


const operatorPriorities: string[][] = [
    ["!"],
    ["**", "^"],
    ["fib", "sin", "cos", "tg", "ctg"],
    ["*", "/", "%"],
    ["+", "-"]
]

const mathBinaryOperators: string[] = Object.keys(mathBinaryFunctions);
const mathUnaryInfixOperators: string[] = Object.keys(mathUnaryInfixFunctions);
const mathUnaryPostfixOperators: string[] = Object.keys(mathUnaryPostfixFunctions);

const allOperators: string[] = [...mathBinaryOperators, ...mathUnaryInfixOperators, ...mathUnaryPostfixOperators];

type Token = string | number;

const isNumber = (test: any): boolean => !isNaN(+test);
const isOperator = (test: Token): boolean => allOperators.includes(test as string);


export const evaluate = (equation: string): number => {
    // pad parentheses, so we tolerate joint parentheses in user input
    equation = equation.replace(/\(/g, " ( ")
        .replace(/\)/g, " ) ")
        .replace(/\s{2,}/g, " ")
        .trim();

    const tokens: Token[] = equation.split(" ").map((tokenString: string) => {
        if (isNumber(tokenString)) return parseFloat(tokenString);
        if (tokenString === "PI") return Math.PI;
        if (isOperator(tokenString)) return tokenString;
        if (isGroupBorder(tokenString)) return tokenString;

        throw new Error(`invalid equation: unknown token "${tokenString}"`);
    })

    return calcPriority(tokens);
}


const calcPriority = (tokens: Token[]): number => {

    if (tokens.length == 1) {
        const token: Token = tokens[0];
        if (!isNumber(token)) throw new Error(`invalid equation: unknown token left "${token}"`);
        return token as number;
    }

    for (let i: number = 0; i < tokens.length; i++) {
        if (isGroupStart(tokens[i])) {
            let groupsLevel = 1;
            let groupEndIndex: number | null = null;
            for (let j: number = i + 1; j < tokens.length; j++) {
                if (isGroupEnd(tokens[j])) groupsLevel--;
                if (isGroupStart(tokens[j])) groupsLevel++;
                if (groupsLevel === 0) {
                    groupEndIndex = j;
                    break;
                };
            }
            if (groupEndIndex === null) throw new Error("invalid equation: missing closing parethesis");
            const group: Token[] = tokens.slice(i + 1, groupEndIndex);
            const result: number = calcPriority(group);
            const restTokens: Token[] = [...tokens.slice(0, i), result, ...tokens.slice(groupEndIndex + 1)];
            return calcPriority(restTokens);
        }
    }

    for (let operators of operatorPriorities) {
        for (let i: number = 0; i < tokens.length; i++) {
            const token: Token = tokens[i];
            if (isOperator(token) && operators.includes(token as string)) {
                const operator: string = token as string;

                if (mathBinaryOperators.includes(operator)) return calculateBinaryOperation(tokens, i);
                if (mathUnaryPostfixOperators.includes(operator)) return calculateUnaryPostfixOperation(tokens, i);
                if (mathUnaryInfixOperators.includes(operator)) return calculateUnaryInfixOperation(tokens, i);

                throw new Error(`invalid equation: no suitable function for operator "${operator}" at position ${i}`);
            }
        }
    }

    throw new Error(`invalid equation: unknown tokens left "${tokens}"`);
}


const calculateBinaryOperation = (tokens: Token[], index: number): number => {
    const operator: string = tokens[index] as string;
    const x: number = tokens[index - 1] as number;
    const y: number = tokens[index + 1] as number;
    const mathBinaryFunction: math.BinaryFunction = mathBinaryFunctions[operator];
    const result: number = mathBinaryFunction(x, y);
    const restTokens: Token[] = [...tokens.slice(0, index - 1), result, ...tokens.slice(index + 2)];
    return calcPriority(restTokens);
}

const calculateUnaryPostfixOperation = (tokens: Token[], index: number): number => {
    const operator: string = tokens[index] as string;
    const mathUnaryPostfixFunction: math.UnaryFunction = mathUnaryPostfixFunctions[operator];
    const previousToken: Token = tokens[index - 1];
    if (!isNumber(previousToken)) throw new Error("invalid equation: use postfix operators as follows: \"5 !\"")

    const result: number = mathUnaryPostfixFunction(previousToken as number);
    const restTokens: Token[] = [...tokens.slice(0, index - 1), result, ...tokens.slice(index + 1)];
    return calcPriority(restTokens);
}

const calculateUnaryInfixOperation = (tokens: Token[], index: number): number => {

    const operator: string = tokens[index] as string;
    const mathUnaryInfixFunction: math.UnaryFunction = mathUnaryInfixFunctions[operator];
    const nextToken: Token = tokens[index + 1];
    if (!isNumber(nextToken)) throw new Error(`invalid equation: infix operator ${operator} at position ${index} is not followed by number: ${nextToken}`);

    const result: number = mathUnaryInfixFunction(nextToken as number);
    const restTokens: Token[] = [...tokens.slice(0, index), result, ...tokens.slice(index + 2)];

    return calcPriority(restTokens);
}


const isGroupStart = (token: Token): boolean => token === "(";
const isGroupEnd = (token: Token): boolean => token === ")";
const isGroupBorder = (token: Token): boolean => isGroupStart(token) || isGroupEnd(token);
