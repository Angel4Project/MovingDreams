import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Lead schema - for storing contact form submissions
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  preferredDate: text("preferred_date"),
  movingType: text("moving_type").notNull(),
  details: text("details"),
  consentToMarketing: boolean("consent_to_marketing").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

// Price Quote schema - for storing calculator quote requests
export const priceQuotes = pgTable("price_quotes", {
  id: serial("id").primaryKey(),
  movingType: text("moving_type").notNull(),
  size: text("size"), // apartment size, office size, or item type
  floor: integer("floor").default(0),
  distance: integer("distance").notNull(),
  additionalServices: text("additional_services").array(),
  estimatedPrice: text("estimated_price"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPriceQuoteSchema = createInsertSchema(priceQuotes).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export type InsertPriceQuote = z.infer<typeof insertPriceQuoteSchema>;
export type PriceQuote = typeof priceQuotes.$inferSelect;
