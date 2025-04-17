import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { env } from "~/env"; // Ensure this is correctly configured

import * as schema from "./schema";

// Create a Neon client
const sql = neon(env.DATABASE_URL);

// Export the database connection
export const db = drizzle(sql, { schema });
