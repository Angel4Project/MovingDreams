import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Lead submissions from contact form
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  serviceType: text("service_type").notNull(),
  message: text("message"),
  movingDate: text("moving_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Price calculator submissions
export const priceQuotes = pgTable("price_quotes", {
  id: serial("id").primaryKey(),
  movingType: text("moving_type").notNull(),
  rooms: integer("rooms"),
  itemType: text("item_type"),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  movingDate: text("moving_date").notNull(),
  includePacking: boolean("include_packing").default(false),
  includeAssembly: boolean("include_assembly").default(false),
  includeStorage: boolean("include_storage").default(false),
  estimatedPrice: integer("estimated_price"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  serviceType: text("service_type").notNull(),
  location: text("location").notNull(),
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
  details: text("details"),
  imageUrl: text("image_url"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Zod schemas for validation
export const insertLeadSchema = createInsertSchema(leads).omit({ id: true, createdAt: true });
export const insertPriceQuoteSchema = createInsertSchema(priceQuotes).omit({ id: true, createdAt: true, estimatedPrice: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true, createdAt: true });

// Types
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type InsertPriceQuote = z.infer<typeof insertPriceQuoteSchema>;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Lead = typeof leads.$inferSelect;
export type PriceQuote = typeof priceQuotes.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
