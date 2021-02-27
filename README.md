# otus-reactjs
Homework for https://otus.ru/lessons/react/

## Console calculator

Run calculator in REPL mode with

`npm start`

Supported operations: 

Operation | Format
--- | ---
sum | `x + y`
substract | `x - y`
multiply | `x * y`
divide | `x / y`
| | |
remainder | `x % y`
power | `x ^ y`
square | `x **`
factorial | `x !`
| | |
sinus | `sin x`
cosinus | `cos x`
tangens | `tg x`
cotangens | `ctg x`
fibonacci | `fib x`

Pad numbers and operators with spaces, e.g. `1 + 2 + 3`.  

Use parentheses `( )` to group operations, e.g. `5 * (3 ** - (2 + 1))` = 30

Trigonometric operations use radians, so `PI` is supported, e.g. `sin(PI / 2)` = 1.

Type `bye` or `quit` or `exit` to stop REPL.

## Tests

`npm test` will run tests

`npm run coverage` will run tests and generate coverage report 