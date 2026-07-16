// database/models/simulation.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISimulatedPortfolio extends Document {
  userId: string; // Supabase user ID string mapping
  cashBalance: number;
  holdings: Map<string, number>; // Maps Stock Symbol -> Owned Quantity
  createdAt: Date;
  updatedAt: Date;
}

const SimulatedPortfolioSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  cashBalance: { type: Number, required: true, default: 1000000 }, // Default 1M Naira
  holdings: { type: Map, of: Number, default: {} },
}, { timestamps: true });

export const SimulatedPortfolio = mongoose.models.SimulatedPortfolio || 
  mongoose.model<ISimulatedPortfolio>('SimulatedPortfolio', SimulatedPortfolioSchema);