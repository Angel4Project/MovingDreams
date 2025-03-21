import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertPriceQuoteSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create API routes
  
  // Lead submission endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      
      // Here you would implement WhatsApp and email sending
      // For this implementation, we'll simply return success message
      
      res.status(201).json({
        success: true,
        message: "Lead received successfully",
        data: lead
      });
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid lead data",
          errors: err.errors
        });
      }
      
      res.status(500).json({
        success: false,
        message: "Failed to process lead"
      });
    }
  });
  
  // Get all leads (admin endpoint)
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.status(200).json({
        success: true,
        data: leads
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve leads"
      });
    }
  });
  
  // Price quote submission endpoint
  app.post("/api/price-quotes", async (req, res) => {
    try {
      const quoteData = insertPriceQuoteSchema.parse(req.body);
      const quote = await storage.createPriceQuote(quoteData);
      
      res.status(201).json({
        success: true,
        message: "Price quote created successfully",
        data: quote
      });
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid price quote data",
          errors: err.errors
        });
      }
      
      res.status(500).json({
        success: false,
        message: "Failed to process price quote"
      });
    }
  });
  
  // Get all price quotes (admin endpoint)
  app.get("/api/price-quotes", async (req, res) => {
    try {
      const quotes = await storage.getPriceQuotes();
      res.status(200).json({
        success: true,
        data: quotes
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve price quotes"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
