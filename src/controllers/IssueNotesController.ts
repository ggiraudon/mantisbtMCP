import axios, { AxiosResponse } from 'axios';
import { config } from '../config/env';
import { IssueNote, IssueNotesList, CreateIssueNote, IssueNoteSchema, IssueNotesListSchema, CreateIssueNoteSchema } from '../types/IssueNote';

export class IssueNotesController {
  private baseURL = config.API_URL;
  private headers = {
    'Authorization': config.API_TOKEN,
    'Content-Type': 'application/json',
  };


  async createIssueNote(issueId: number, noteData: CreateIssueNote): Promise<IssueNote> {
    try {
      // Validate input
      const validatedData = CreateIssueNoteSchema.parse(noteData);
      
      const response: AxiosResponse = await axios.post(
        `${this.baseURL}/api/rest/issues/${issueId}/notes`,
        validatedData,
        { headers: this.headers }
      );
      
      const newNote = response.data.note || response.data;
      return IssueNoteSchema.parse(newNote);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to create issue note: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }


  async deleteIssueNote(issueId: number, noteId: number): Promise<void> {
    try {
      await axios.delete(
        `${this.baseURL}/api/rest/issues/${issueId}/notes/${noteId}`,
        { headers: this.headers }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to delete issue note: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }
}
