import { DiceQuery } from "./DiceQuery";

export function roll(diceQuery: string): number {
  const query = new DiceQuery(diceQuery);
  return query.result;
}