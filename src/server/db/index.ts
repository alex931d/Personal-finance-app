import { env } from "@/env";
import * as schema from "./schema";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";


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