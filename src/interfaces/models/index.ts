import { ETypeTimer } from "@/enums/common.enum";
import { Types } from "mongoose";

export interface IBaseModel {
  _id: string;
  isDeleted: boolean;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IBaseModel {
  account: string;
  password: string;
  role: string;
  roleEng: string;
}

export interface IToken extends IBaseModel {
  token_code: string;
  token_secretKey: string;
  token_user: string; // id user
}

export interface ISubCategory extends IBaseModel {
  name: string;
  id: string;
  categoryID: string;
}

export interface IImage extends IBaseModel {
  alt: string;
  url: string;
  format: string;
  key: string;
  size: number;
  width: number;
  heigh: number;
  deletedAt: Date;
  deletedBy: IUser | Types.ObjectId;
  createdBy: IUser | Types.ObjectId;
  updatedBy: IUser | Types.ObjectId ;
}

export interface IFeedBack extends IBaseModel {
  imgName: string;
  url: string;
  description: string;
  subCategoryID: ISubCategory | Types.ObjectId | string;
  CategoryID: ICategory | Types.ObjectId | string;
  deletedAt: Date;
  deletedBy: IUser | Types.ObjectId;
  createdBy: IUser | Types.ObjectId;
  updatedBy: IUser | Types.ObjectId ;
  nameFeedback: string;
  subCategory?: ISubCategory; 
  category?: {
    _id: string;
    name: string;
    isDeleted?: boolean;
  };
}

export interface IFeedBack1 extends IBaseModel {
  imgName: string;
  url: string;
  description: string;
  subCategoryID: ISubCategory | Types.ObjectId | string;
  CategoryID: ICategory | Types.ObjectId | string;
  deletedAt: Date;
  deletedBy: IUser | Types.ObjectId;
  createdBy: IUser | Types.ObjectId;
  updatedBy: IUser | Types.ObjectId ;
  nameFeedback: string;
  subCategory?: string; 
  category?: {
    _id: string;
    name: string;
    isDeleted?: boolean;
  };
}

export interface ICategory extends IBaseModel {
  name: string;
  id: string;
  subCategoriesID: Array<string>;
}

export interface IQueries {
  limit: string;
  page: string;
  isDeleted: boolean;
}

export interface ITimer {
  type: ETypeTimer;
  value: number;
}