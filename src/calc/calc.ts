import { parseEquation, tryParseGroup } from "./parser";
import { Token, isNumber, isOperator, isMathBinaryOperator, isMathUnaryInfixOperator, isMathUnaryPostfixOperator } from "./token";
import { operatorBinaryFunctions, operatorUnaryInfixFunctions, operatorUnaryPostfixFunctions, operatorPriorities } from "./operators";
import { BinaryFunction, UnaryFunction } from "./mathFunctions";

type CalculateOperation = (tokens: Token[], operatorIndex: number) => number;

/**
 * Evaluates equation into array of tokens.
 * @param {string} equation Equation string in form of numbers, operators and groups, e.g. `5 * (1 + 2)`.
 * @throws Error if invalid equation or unsupported operation.
 * @returns {number} Calculation result.
 */
export const evaluate = (equation: string): number => {
    const tokens: Token[] = parseEquation(equation);

    return calculate(tokens);
};

/**
 * Calculates equation as array of tokens step by step by priorities.
 * @returns {number} Calculation result.
 */
const calculate = (tokens: Token[]): number => {
    if (tokens.length == 1) {
        const token: Token = tokens[0];
        if (!isNumber(token)) throw new Error(`invalid equation: unknown token left "${token}"`);
        return token as number;
    }

    for (let i = 0; i < tokens.length; i++) {
        const group: Token[] | null = tryParseGroup(tokens, i);
        if (group != null) {
            const result: number = calculate(group);
            const groupEndIndex: number = i + group.length + 2;
            const restTokens: Token[] = [...tokens.slice(0, i), result, ...tokens.slice(groupEndIndex)];
            return calculate(restTokens);
        }
    }

    for (const priorityLevel of operatorPriorities) {
        for (let i = 0; i < tokens.length; i++) {
            const token: Token = tokens[i];
            if (isOperator(token) && priorityLevel.includes(token as string)) {
                const operator: string = token as string;

                if (isMathBinaryOperator(operator)) return calculateBinaryOperation(tokens, i);
                if (isMathUnaryPostfixOperator(operator)) return calculateUnaryPostfixOperation(tokens, i);
                if (isMathUnaryInfixOperator(operator)) return calculateUnaryInfixOperation(tokens, i);

                throw new Error(`invalid equation: no suitable function for operator "${operator}" at position ${i}`);
            }
        }
    }

    throw new Error(`invalid equation: unknown tokens left "${tokens}"`);
};

const calculateBinaryOperation: CalculateOperation = (tokens, operatorIndex) => {
    const operator: string = tokens[operatorIndex] as string;
    if (operatorIndex == 0 || operatorIndex == tokens.length - 1)
        throw new Error(`invalid equation: binary operator "${operator}" at position ${operatorIndex} must have 2 operands`);

    const x: number = tokens[operatorIndex - 1] as number;
    const y: number = tokens[operatorIndex + 1] as number;
    const mathBinaryFunction: BinaryFunction = operatorBinaryFunctions[operator];
    const result: number = mathBinaryFunction(x, y);
    const restTokens: Token[] = [...tokens.slice(0, operatorIndex - 1), result, ...tokens.slice(operatorIndex + 2)];
    return calculate(restTokens);
};

const calculateUnaryPostfixOperation: CalculateOperation = (tokens, operatorIndex) => {
    const operator: string = tokens[operatorIndex] as string;
    const mathUnaryPostfixFunction: UnaryFunction = operatorUnaryPostfixFunctions[operator];
    const previousToken: Token = tokens[operatorIndex - 1];
    if (!isNumber(previousToken)) throw new Error(`invalid equation: use postfix operators as follows: "5 ${operator}"`);

    const result: number = mathUnaryPostfixFunction(previousToken as number);
    const restTokens: Token[] = [...tokens.slice(0, operatorIndex - 1), result, ...tokens.slice(operatorIndex + 1)];
    return calculate(restTokens);
};

const calculateUnaryInfixOperation: CalculateOperation = (tokens, operatorIndex) => {
    const operator: string = tokens[operatorIndex] as string;
    const mathUnaryInfixFunction: UnaryFunction = operatorUnaryInfixFunctions[operator];
    const nextToken: Token = tokens[operatorIndex + 1];
    if (!isNumber(nextToken))
        throw new Error(
            `invalid equation: infix operator "${operator}" at position ${operatorIndex} is not followed by number: ${nextToken}`
        );

    const result: number = mathUnaryInfixFunction(nextToken as number);
    const restTokens: Token[] = [...tokens.slice(0, operatorIndex), result, ...tokens.slice(operatorIndex + 2)];

    return calculate(restTokens);
};
