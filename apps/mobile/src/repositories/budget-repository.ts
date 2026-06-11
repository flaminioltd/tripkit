import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { expenses } from '../db/schema';
import * as Crypto from 'expo-crypto';

export class BudgetRepository {
  async getExpensesForTrip(tripId: string) {
    return db.select()
      .from(expenses)
      .where(eq(expenses.tripId, tripId))
      .orderBy(expenses.date);
  }

  async addExpense(data: Omit<typeof expenses.$inferInsert, 'id'>) {
    const id = Crypto.randomUUID();
    const cleanData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined)) as typeof data;
    return db.insert(expenses)
      .values({ ...cleanData, id })
      .returning();
  }

  async updateExpense(id: string, data: Partial<Omit<typeof expenses.$inferInsert, 'id' | 'tripId'>>) {
    const cleanData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
    return db.update(expenses)
      .set(cleanData)
      .where(eq(expenses.id, id))
      .returning();
  }

  async deleteExpense(id: string) {
    return db.delete(expenses).where(eq(expenses.id, id)).returning();
  }
}

export const budgetRepo = new BudgetRepository();
