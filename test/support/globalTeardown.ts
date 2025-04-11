import { database } from "../../src/persistence";

export default async function globalTeardown(): Promise<void> {
  console.log("Closing database pool");
  await database.$pool.end();
}
