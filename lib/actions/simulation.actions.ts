'use server';

import { connectToDatabase } from "@/database/mongoose";
import { SimulatedPortfolio } from "@/database/models/simulation.model";
import { revalidatePath } from "next/cache";

export async function getOrCreatePortfolio(userId: string) {
  await connectToDatabase();
  let portfolio = await SimulatedPortfolio.findOne({ userId });

  if (!portfolio) {
    portfolio = await SimulatedPortfolio.create({
      userId,
      cashBalance: 1000000, 
      holdings: {},
    });
  }
  return JSON.parse(JSON.stringify(portfolio));
}

export async function executeTrade(userId: string, symbol: string, quantity: number, price: number, type: 'BUY' | 'SELL') {
  await connectToDatabase();
  const portfolio = await SimulatedPortfolio.findOne({ userId });
  if (!portfolio) throw new Error("Portfolio profile not found.");

  const transactionCost = quantity * price;

  if (type === 'BUY') {
    if (portfolio.cashBalance < transactionCost) return { success: false, error: "Insufficient paper balance." };
    portfolio.cashBalance -= transactionCost;
    
    // Safely handle Mongoose Map getters
    const currentQty = portfolio.holdings?.get(symbol) || 0;
    portfolio.holdings.set(symbol, currentQty + quantity);
  } else {
    const currentQty = portfolio.holdings?.get(symbol) || 0;
    if (currentQty < quantity) return { success: false, error: "Insufficient shares to sell." };
    portfolio.cashBalance += transactionCost;
    
    const nextQty = currentQty - quantity;
    if (nextQty <= 0) {
      portfolio.holdings.delete(symbol);
    } else {
      portfolio.holdings.set(symbol, nextQty);
    }
  }

  await portfolio.save();
  revalidatePath('/simulator'); // Forces Next.js to refresh the page with the new DB values
  return { success: true, portfolio: JSON.parse(JSON.stringify(portfolio)) };
}