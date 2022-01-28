import { Document } from 'mongoose';
    
export interface Post extends Document {
  readonly selectedDate: Date;
  readonly description: string;
  readonly temperature: string;
}