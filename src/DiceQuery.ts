import { Dice } from "./Dice";
import { getQueryOperator, QueryOperator } from "./QueryOperator";

export class DiceQuery {
  private dice: Dice[];
  private operations: QueryOperator[];

  public result: number;

  constructor(diceQuery: string) {
    this.dice = [];
    this.operations = [];
    this.result = 0;
    if (diceQuery.length === 0) {
      throw new Error("Dice query cannot be empty");
    }

    this.parseQuery(diceQuery);
    this.calculate();
  }

  private parseQuery(query: string) {
    query = query.replace(/\s/g, "");

    const dice = query.match(/\d*d?\d+/g);
    const operations = query.match(/([\*\-\/\+])/g);

    if (dice === null) {
      throw new Error("Invalid dice query");
    }

    const diceValues = dice.map((d) => this.parseDiceToValue(d));
    this.dice = diceValues;

    if (operations === null) {
      if (query.replace(/\d/g, "").match(/[\W_]/g)) {
        throw new Error("Invalid dice query");
      }
    } else {
      const operationValues = operations.map((o) => getQueryOperator(o));
      this.operations = operationValues;
    }
  }

  private parseDiceToValue(dice: string): Dice {
    const parts = dice.split("d");
    const count = parseInt(parts[0], 10);
    const sides = parseInt(parts[1], 10);

    if (isNaN(count) && isNaN(sides)) {
      throw new Error("Invalid dice format");
    }

    if (isNaN(sides) && !isNaN(count)) {
      return {
        value: count,
        isDice: false,
      };
    }

    if (isNaN(count) && !isNaN(sides)) {
      return {
        value: sides,
        isDice: true,
      };
    }

    return {
      isDice: true,
      value: count * sides,
    };
  }

  private calculate() {
    let evaluation = "";
    for (let i = 0; i < this.dice.length; i++) {
      if (this.dice[i].isDice) {
        evaluation += Math.floor(Math.random() * this.dice[i].value) + 1;
      } else {
        evaluation += this.dice[i].value;
      }

      if (this.operations[i]) {
        evaluation += this.operations[i];
      }
    }

    this.result = eval(evaluation) as number;
  }

  public toString() {
    return this.result.toString();
  }
}
