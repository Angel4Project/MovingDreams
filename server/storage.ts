import { 
  Lead, InsertLead, 
  PriceQuote, InsertPriceQuote, 
  Testimonial, InsertTestimonial 
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // Leads
  getLeads(): Promise<Lead[]>;
  getLead(id: number): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;

  // Price Quotes
  getPriceQuotes(): Promise<PriceQuote[]>;
  getPriceQuote(id: number): Promise<PriceQuote | undefined>;
  createPriceQuote(quote: InsertPriceQuote): Promise<PriceQuote>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getActiveTestimonials(): Promise<Testimonial[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private leads: Map<number, Lead>;
  private priceQuotes: Map<number, PriceQuote>;
  private testimonials: Map<number, Testimonial>;
  
  private leadId: number;
  private quoteId: number;
  private testimonialId: number;

  constructor() {
    this.leads = new Map();
    this.priceQuotes = new Map();
    this.testimonials = new Map();
    
    this.leadId = 1;
    this.quoteId = 1;
    this.testimonialId = 1;

    // Initialize with sample testimonials
    this.initTestimonials();
  }

  private initTestimonials() {
    const testimonialData: InsertTestimonial[] = [
      {
        name: "דני כהן",
        serviceType: "הובלת דירה",
        location: "תל אביב",
        rating: 5,
        content: "שירות מעולה! צוות מקצועי ואדיב, הגיעו בזמן והתייחסו לחפצים שלנו בזהירות מירבית. ההובלה הייתה חלקה במיוחד וללא כל תקלות. מומלץ בחום!",
        details: "הובלת דירת 3 חדרים, שירותי פירוק והרכבה, אריזת כלי מטבח ופריטים עדינים, הובלה מתל אביב לרמת גן",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop",
        active: true
      },
      {
        name: "מיכל לוי",
        serviceType: "הובלת משרד",
        location: "חיפה",
        rating: 5,
        content: "העברנו את המשרד שלנו בעזרת אור להובלות ואני חייבת לציין שהיה מדהים! היעילות והמקצועיות של הצוות אפשרה לנו לחזור לעבודה תוך יום אחד בלבד.",
        details: "הובלת משרד 120 מ\"ר, פירוק והרכבת ריהוט משרדי, העברת מחשבים וציוד רגיש, הובלה ממרכז העיר לפארק הייטק",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop",
        active: true
      },
      {
        name: "יוסי אברהם",
        serviceType: "הובלת פסנתר",
        location: "ירושלים",
        rating: 4.5,
        content: "הפסנתר שלי הוא פריט יקר ערך ורגיש. הצוות של אור להובלות טיפל בו בצורה מקצועית ובטוחה, כולל פירוק וכיוון מחדש במיקום החדש. התוצאה מושלמת!",
        details: "הובלת פסנתר כנף גדול, צוות מיוחד להובלת פסנתרים, מנוף וציוד מיוחד, הורדה מקומה 4 ללא מעלית",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop",
        active: true
      }
    ];

    testimonialData.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }

  // Lead methods
  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async getLead(id: number): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = this.leadId++;
    const now = new Date();
    const lead: Lead = { ...insertLead, id, createdAt: now };
    this.leads.set(id, lead);
    return lead;
  }

  // Price Quote methods
  async getPriceQuotes(): Promise<PriceQuote[]> {
    return Array.from(this.priceQuotes.values());
  }

  async getPriceQuote(id: number): Promise<PriceQuote | undefined> {
    return this.priceQuotes.get(id);
  }

  async createPriceQuote(insertQuote: InsertPriceQuote): Promise<PriceQuote> {
    const id = this.quoteId++;
    const now = new Date();
    
    // Calculate estimated price
    let estimatedPrice = 0;
    
    if (insertQuote.movingType === 'apartment') {
      // Base price for apartment based on rooms
      const basePrice = (insertQuote.rooms || 3) * 500;
      estimatedPrice = basePrice;
    } else if (insertQuote.movingType === 'office') {
      // Base price for office
      estimatedPrice = 3000;
    } else if (insertQuote.movingType === 'single-item') {
      // Base price for single item
      estimatedPrice = 700;
      
      // Add extra for specific items
      if (insertQuote.itemType === 'piano') {
        estimatedPrice += 1500;
      } else if (insertQuote.itemType === 'safe') {
        estimatedPrice += 1000;
      }
    }
    
    // Add for additional services
    if (insertQuote.includePacking) {
      estimatedPrice += 500;
    }
    if (insertQuote.includeAssembly) {
      estimatedPrice += 400;
    }
    if (insertQuote.includeStorage) {
      estimatedPrice += 800;
    }
    
    // Add for distance (mock calculation)
    estimatedPrice += 300;
    
    const quote: PriceQuote = { 
      ...insertQuote, 
      id, 
      estimatedPrice,
      createdAt: now 
    };
    
    this.priceQuotes.set(id, quote);
    return quote;
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialId++;
    const now = new Date();
    const testimonial: Testimonial = { ...insertTestimonial, id, createdAt: now };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values())
      .filter(testimonial => testimonial.active);
  }
}

export const storage = new MemStorage();
