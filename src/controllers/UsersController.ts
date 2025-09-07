import axios, { AxiosResponse } from 'axios';
import { config } from '../config/env';
import { User, UsersList, UserSchema, UsersListSchema } from '../types/User';

export class UsersController {
  private baseURL = config.API_URL;
  private headers = {
    'Authorization': config.API_TOKEN,
    'Content-Type': 'application/json',
  };

  async getUser(userId: number): Promise<User> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseURL}/api/rest/users/${userId}`,
        { headers: this.headers }
      );
      
      const userData = response.data.user || response.data;
      return UserSchema.parse(userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to get user: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseURL}/api/rest/users/username/${username}`,
        { headers: this.headers }
      );
      
      const userData = response.data.user || response.data;
      return UserSchema.parse(userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to get user by username: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseURL}/api/rest/users/me`,
        { headers: this.headers }
      );
      
      const userData = response.data.user || response.data;
      return UserSchema.parse(userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to get current user: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const response: AxiosResponse = await axios.post(
        `${this.baseURL}/api/rest/users/`,
        userData,
        { headers: this.headers }
      );
      
      const newUser = response.data.user || response.data;
      return UserSchema.parse(newUser);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to create user: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async updateUser(userId: number, userData: Partial<User>): Promise<User> {
    try {
      const response: AxiosResponse = await axios.patch(
        `${this.baseURL}/api/rest/users/${userId}`,
        userData,
        { headers: this.headers }
      );
      
      const updatedUser = response.data.user || response.data;
      return UserSchema.parse(updatedUser);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to update user: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      await axios.delete(
        `${this.baseURL}/api/rest/users/${userId}`,
        { headers: this.headers }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to delete user: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }

  async resetUserPassword(userId: number): Promise<void> {
    try {
      await axios.put(
        `${this.baseURL}/api/rest/users/${userId}/reset`,
        {},
        { headers: this.headers }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to reset user password: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }
}
