import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { settings } from '../db/schema';

export class SettingsRepository {
  async getSettings() {
    const result = await db.select().from(settings).limit(1);
    return result[0] || null;
  }

  async saveSettings(data: Partial<typeof settings.$inferInsert>) {
    const existing = await this.getSettings();
    const cleanData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
    if (existing) {
      return db.update(settings)
        .set({ ...cleanData, updatedAt: new Date() })
        .where(eq(settings.id, existing.id))
        .returning();
    } else {
      return db.insert(settings)
        .values({ ...cleanData, id: 1, updatedAt: new Date() })
        .returning();
    }
  }
}

export const settingsRepo = new SettingsRepository();
