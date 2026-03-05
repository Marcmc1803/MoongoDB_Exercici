import { Schema, model, Document, Types } from 'mongoose';

// 1. Interfície de dades pures (la que retorna .lean())
export interface IProjectData {
  name: string;
  description: string;
  organization: Types.ObjectId;
  status: 'active' | 'completed' | 'archived';
  createdAt: Date;
}

// 2. Interfície per a Mongoose (amb mètodes com .save())
export interface IProject extends IProjectData, Document {}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  organization: { 
    type: Schema.Types.ObjectId, 
    ref: 'Organization', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['active', 'completed', 'archived'], 
    default: 'active' 
  },
  createdAt: { type: Date, default: Date.now }
});

export const ProjectModel = model<IProject>('Project', ProjectSchema);