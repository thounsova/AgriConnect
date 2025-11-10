import { ObjectId } from 'mongoose';

export interface IUser {
  _id?: ObjectId;        
  full_name: string;
  user_name: string;
  email: string;
  password: string;
  roleId?: ObjectId | string;
  role?: string;
  phone?: number;
  age?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CreateUserInput {
  full_name: string;
  user_name: string;
  email: string;
  password: string;
  phone?: number;
  age?: number;
  roleId?: string;
  data?: Partial<IUser>; 
}
export interface UserResult {
  success: boolean;
  data: IUser | IUser[] | null;
  message: string;
}