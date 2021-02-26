import { Token, isNumber, isOperator, isGroupBorder, isGroupEnd, isGroupStart, isPI } from "./token";

/**
 * Parses equation into array of tokens.
 * @param {string} equation Equation string in form of numbers, operators and groups, e.g. `5 * (1 + 2)`.
 * @throws Error if invalid equation.
 */
export const parseEquation = (equation: string): Token[] => {
    // pad parentheses with spaces to tolerate joint parentheses in user input
    equation = equation
        .replace(/\(/g, " ( ")
        .replace(/\)/g, " ) ")
        .replace(/\s{2,}/g, " ")
        .trim();

    const tokens: Token[] = equation.split(" ").map((tokenString: string) => {
        if (isNumber(tokenString)) return parseFloat(tokenString);
        if (isPI(tokenString)) return Math.PI;
        if (isOperator(tokenString)) return tokenString;
        if (isGroupBorder(tokenString)) return tokenString;

        throw new Error(`invalid equation: unknown token "${tokenString}"`);
    });

    return tokens;
};

/**
 * Tries to parse group starting at indexed token.
 * @param {Token[]} tokens Equation as array of tokens.
 * @param {number}  groupStartIndex Index of possible group start token.
 * @throws Error if group start and group end tokens mismatch.
 * @returns Arrays of tokens inside parsed group if indexed token is a group start token or `null` otherwise.
 */
export const tryParseGroup = (tokens: Token[], groupStartIndex: number): Token[] | null => {
    if (isGroupStart(tokens[groupStartIndex])) {
        let groupsLevel = 1;
        let groupEndIndex: number | null = null;
        for (let i: number = groupStartIndex + 1; i < tokens.length; i++) {
            if (isGroupEnd(tokens[i])) groupsLevel--;
            if (isGroupStart(tokens[i])) groupsLevel++;
            if (groupsLevel === 0) {
                groupEndIndex = i;
                break;
            }
        }

        if (groupEndIndex === null) throw new Error("invalid equation: missing closing parenthesis");
        const group: Token[] = tokens.slice(groupStartIndex + 1, groupEndIndex);
        return group;
    }
    return null;
};
