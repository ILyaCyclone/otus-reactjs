import { operatorBinaryFunctions, operatorUnaryInfixFunctions, operatorUnaryPostfixFunctions } from "./operators";

export type Token = string | number;

type TokenCheck = (token: Token) => boolean;

export const isNumber: TokenCheck = (token) => !isNaN(+token);

export const isGroupStart: TokenCheck = (token) => token === "(";
export const isGroupEnd: TokenCheck = (token) => token === ")";
export const isGroupBorder: TokenCheck = (token) => isGroupStart(token) || isGroupEnd(token);

export const isPI: TokenCheck = (token) => token === "PI";

const mathBinaryOperators: string[] = Object.keys(operatorBinaryFunctions);
const mathUnaryInfixOperators: string[] = Object.keys(operatorUnaryInfixFunctions);
const mathUnaryPostfixOperators: string[] = Object.keys(operatorUnaryPostfixFunctions);
const allOperators: string[] = [...mathBinaryOperators, ...mathUnaryInfixOperators, ...mathUnaryPostfixOperators];

export const isMathBinaryOperator: TokenCheck = (token) => mathBinaryOperators.includes(token as string);
export const isMathUnaryInfixOperator: TokenCheck = (token) => mathUnaryInfixOperators.includes(token as string);
export const isMathUnaryPostfixOperator: TokenCheck = (token) => mathUnaryPostfixOperators.includes(token as string);
export const isOperator: TokenCheck = (token) => allOperators.includes(token as string);
