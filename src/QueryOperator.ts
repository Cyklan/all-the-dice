export enum QueryOperator {
  Add = "+",
  Subtract = "-",
  Multiply = "*",
  Divide = ":",
}

export function getQueryOperator(operator: string) {
  switch (operator) {
    case "+":
      return QueryOperator.Add;
    case "-":
      return QueryOperator.Subtract;
    case "*":
      return QueryOperator.Multiply;
    case ":":
      return QueryOperator.Divide;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}