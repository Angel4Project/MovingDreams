import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertPriceQuoteSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.router;

  // Get testimonials
  app.get("/api/testimonials", async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getActiveTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Submit contact form (lead)
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertLeadSchema.parse(req.body);
      
      // Store the lead
      const lead = await storage.createLead(validatedData);
      
      // Return success response
      res.status(201).json({
        success: true,
        message: "פרטים נשלחו בהצלחה!",
        data: lead
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: "שגיאה בפרטים שהוזנו",
          errors: validationError.details
        });
      }
      
      console.error("Error submitting contact form:", error);
      res.status(500).json({
        success: false,
        message: "אירעה שגיאה בשליחת הטופס, אנא נסה שנית."
      });
    }
  });

  // Submit price calculator (quote)
  app.post("/api/price-quote", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertPriceQuoteSchema.parse(req.body);
      
      // Store the quote and calculate price
      const quote = await storage.createPriceQuote(validatedData);
      
      // Return success response with estimated price
      res.status(201).json({
        success: true,
        message: "הצעת המחיר נשלחה בהצלחה!",
        data: quote
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: "שגיאה בפרטים שהוזנו",
          errors: validationError.details
        });
      }
      
      console.error("Error submitting price quote:", error);
      res.status(500).json({
        success: false,
        message: "אירעה שגיאה בחישוב הצעת המחיר, אנא נסה שנית."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
