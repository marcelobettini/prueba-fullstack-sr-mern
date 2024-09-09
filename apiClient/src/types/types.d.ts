export interface iUser {
  createdAt: Date;
  email: string;
  id: string;
  role: userRole;
  updatedAt: Date;
  username: string;
}

export type userRole = "reader" | "creator" | "admin";

export interface iCategory {
  id: string;
  name: string;
  type: categoryType;
  coverImage: string;
}
export type categoryType = "image" | "video" | "document";

export interface iPermissions {
  images: boolean;
  videos: boolean;
  texts: boolean;
}

export interface iTheme {
  id: string;
  name: string;
  permissions: iPermissions;
}
