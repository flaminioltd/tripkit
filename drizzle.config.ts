import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './apps/mobile/src/db/schema.ts',
  out: './apps/mobile/src/db/migrations',
  dialect: 'sqlite',
  driver: 'expo',
});
