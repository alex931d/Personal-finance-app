import { env } from "@/env";
import * as schema from "./schema";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { TransactionRollbackError, } from "drizzle-orm";



type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
export function abortableTransaction<T>(
  callback: (tx: Transaction) => Promise<T>,
  {
    signal,
    database = db,
  }: {
    signal: AbortSignal;
    database: PostgresJsDatabase<typeof schema>;
  }
): Promise<T> {
  return database.transaction(async (tx: Transaction) => {
    if (signal.aborted) {
      throw new TransactionRollbackError();
    }

    const abortPromise = new Promise<never>((_, reject) => {
      const onAbort = () => {
        reject(new TransactionRollbackError());
      };
      signal.addEventListener('abort', onAbort, { once: true });
    });

    return Promise.race([callback(tx), abortPromise]);
  });
}

declare global {
  // eslint-disable-next-line no-var
  var db: PostgresJsDatabase<typeof schema> | undefined;
  // eslint-disable-next-line no-var
  var pg: ReturnType<typeof postgres> | undefined;
}

let pg: ReturnType<typeof postgres>;
let db: PostgresJsDatabase<typeof schema>;

if (env.NODE_ENV === "production") {
  pg = postgres(env.DATABASE_URL);
  db = drizzle(pg, { schema });
} else {
  if (!global.pg) {
    global.pg = postgres(env.DATABASE_URL);
  }

  if (!global.db) {
    global.db = drizzle(global.pg, { schema });
  }

  pg = global.pg;
  db = global.db;

}

export { db, pg };