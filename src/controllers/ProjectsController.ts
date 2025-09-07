import axios, { AxiosResponse } from 'axios';
import { config } from '../config/env';
import { Project, ProjectsList, ProjectSchema, ProjectsListSchema } from '../types/Project';

export class ProjectsController {
  private baseURL = config.API_URL;
  private headers = {
    'Authorization': config.API_TOKEN,
    'Content-Type': 'application/json',
  };

  async getProject(projectId: number): Promise<Project> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseURL}/api/rest/projects/${projectId}`,
        { headers: this.headers }
      );

      const projectData = response.data;
      var projectList: ProjectsList = ProjectsListSchema.parse(projectData);
      return projectList.projects[0];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to get project: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async getProjects(): Promise<ProjectsList> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseURL}/api/rest/projects/`,
        { headers: this.headers }
      );
      
      return ProjectsListSchema.parse(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to get projects: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async createProject(projectData: Partial<Project>): Promise<Project> {
    try {
      const response: AxiosResponse = await axios.post(
        `${this.baseURL}/api/rest/projects/`,
        projectData,
        { headers: this.headers }
      );
      
      const newProject = response.data.project || response.data;
      return ProjectSchema.parse(newProject);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to create project: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async updateProject(projectId: number, projectData: Partial<Project>): Promise<Project> {
    try {
      const response: AxiosResponse = await axios.patch(
        `${this.baseURL}/api/rest/projects/${projectId}`,
        projectData,
        { headers: this.headers }
      );
      
      const updatedProject = response.data.project || response.data;
      return ProjectSchema.parse(updatedProject);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to update project: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async deleteProject(projectId: number): Promise<void> {
    try {
      await axios.delete(
        `${this.baseURL}/api/rest/projects/${projectId}`,
        { headers: this.headers }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to delete project: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }
}
