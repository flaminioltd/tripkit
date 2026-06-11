import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { trips } from '../db/schema';
import * as Crypto from 'expo-crypto';

export class TripRepository {
  async getTrips() {
    return db.select().from(trips).orderBy(trips.createdAt);
  }

  async getTripById(id: string) {
    const result = await db.select().from(trips).where(eq(trips.id, id)).limit(1);
    return result[0] || null;
  }

  async createTrip(data: Omit<typeof trips.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>) {
    const id = Crypto.randomUUID();
    const cleanData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null)) as typeof data;
    return db.insert(trips)
      .values({
        ...cleanData,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
  }

  async updateTrip(id: string, data: Partial<Omit<typeof trips.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>>) {
    const cleanData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
    return db.update(trips)
      .set({ ...cleanData, updatedAt: new Date() })
      .where(eq(trips.id, id))
      .returning();
  }

  async deleteTrip(id: string) {
    return db.delete(trips).where(eq(trips.id, id)).returning();
  }
}

export const tripRepo = new TripRepository();
