import { ProjectModel, IProject, IProjectData } from '../models/project.js';
import { UpdateQuery } from 'mongoose';

export const createProject = async (data: Partial<IProjectData>): Promise<IProject> => {
  return await new ProjectModel(data).save();
};

export const getProjectById = async (id: string) => {
  return await ProjectModel.findById(id).populate('organization').exec();
};

export const updateProject = async (id: string, data: UpdateQuery<IProjectData>) => {
  return await ProjectModel.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteProject = async (id: string) => {
  return await ProjectModel.findByIdAndDelete(id).exec();
};

// Retornem IProjectData[] per evitar l'error de tipus del .lean()
export const listAllProjects = async (): Promise<IProjectData[]> => {
  return await ProjectModel.find().lean().exec() as IProjectData[];
};