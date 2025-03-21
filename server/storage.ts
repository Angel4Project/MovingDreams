import { 
  users, type User, type InsertUser,
  leads, type Lead, type InsertLead,
  priceQuotes, type PriceQuote, type InsertPriceQuote
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lead methods
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  
  // Price quote methods
  createPriceQuote(quote: InsertPriceQuote): Promise<PriceQuote>;
  getPriceQuotes(): Promise<PriceQuote[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private leads: Map<number, Lead>;
  private priceQuotes: Map<number, PriceQuote>;
  private userId: number;
  private leadId: number;
  private priceQuoteId: number;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.priceQuotes = new Map();
    this.userId = 1;
    this.leadId = 1;
    this.priceQuoteId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Lead methods
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.leadId++;
    const now = new Date();
    const lead: Lead = { 
      ...insertLead, 
      id, 
      createdAt: now 
    };
    this.leads.set(id, lead);
    return lead;
  }
  
  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }
  
  // Price quote methods
  async createPriceQuote(insertQuote: InsertPriceQuote): Promise<PriceQuote> {
    const id = this.priceQuoteId++;
    const now = new Date();
    const quote: PriceQuote = { 
      ...insertQuote, 
      id, 
      createdAt: now 
    };
    this.priceQuotes.set(id, quote);
    return quote;
  }
  
  async getPriceQuotes(): Promise<PriceQuote[]> {
    return Array.from(this.priceQuotes.values());
  }
}

export const storage = new MemStorage();
