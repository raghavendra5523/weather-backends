import * as mongoose from 'mongoose';
    
export const WeatherSchema = new mongoose.Schema({
  selectedDate: Date,
  description: String,
  temperature: String,
});