import { getQueryOperator, QueryOperator } from "./QueryOperator";

export class DiceQuery {
  private dice: number[];
  private operations: QueryOperator[];

  public result: number;

  constructor(diceQuery: string) {
    this.dice = [];
    this.operations = [];
    this.result = 0;
    if (diceQuery.length === 0) {
      throw new Error("Dice query cannot be empty");
    }
  }

  private parseQuery(query: string) {
    query = query.replace(/\s/g, "");

    const dice = query.match(/\d*d?\d+/g);
    const operations = query.match(/[[+\-*/]]/g);

    if (dice === null) {
      throw new Error("Invalid dice query");
    }

    const diceValues = dice.map((d) => this.parseDiceToValue(d));
    this.dice = diceValues;
    
    if (operations !== null) {
      const operationValues = operations.map((o) => getQueryOperator(o));
      this.operations = operationValues;
    }
  }

  private parseDiceToValue(dice: string): number {
    const parts = dice.split("d");
    const count = parseInt(parts[0], 10);
    const sides = parseInt(parts[1], 10);

    if (isNaN(count) || isNaN(sides)) {
      throw new Error("Invalid dice format");
    }

    return count * sides;
  }

  private calculate(): number {
    return 0;
  }

  public toString() {
    return this.calculate().toString();
  }
}
