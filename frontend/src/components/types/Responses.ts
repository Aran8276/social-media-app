export interface CommentCreateResponse {
  success: boolean;
  message: string;
  comment: string;
}

export interface CommentResponse {
  success: boolean;
  message: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  owner_id: string;
  post_impressions_id: string;
  comment: string;
  likes: number;
  created_at: Date;
  updated_at: Date;
  is_liked: boolean;
  is_owned: boolean;
  user: User;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  followers: string;
  following: string;
  liked_contents: string;
  email_verified_at: Date;
  password: string;
  remember_token: string;
  created_at: Date;
  updated_at: Date;
}

export interface PostResponse {
  success: boolean;
  message: string;
  post: Post;
}

export interface Post {
  id: string;
  owner_id: string;
  post_media_id: string;
  post_impressions_id: string;
  content: string;
  visibility: string;
  created_at: Date;
  updated_at: Date;
  is_liked: boolean;
  is_owned: boolean;
  media: Media;
  impressions: Impressions;
  user: User;
}

export interface Impressions {
  id: string;
  likes: number;
  views: number;
}

export interface Media {
  id: string;
  images: string;
  videos: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  followers: string;
  following: string;
  liked_contents: string;
  email_verified_at: Date;
  password: string;
  remember_token: string;
  created_at: Date;
  updated_at: Date;
}

export interface PostLikeResponse {
  success: boolean;
  message: string;
  post: string;
}

export interface PostCreateResponse {
  success: boolean;
  message: string;
  post: string;
}

export interface PostDeleteResponse {
  success: boolean;
  message: string;
  post: string;
}

export interface PostEditResponse {
  success: boolean;
  message: string;
  post: string;
}

export interface UserResponse {
  id: string;
  name: string;
  username: string;
  email: string;
  followers: string;
  following: string;
  liked_contents: string;
  email_verified_at: Date;
  password: string;
  remember_token: string;
  created_at: Date;
  updated_at: Date;
}

export interface LoginResponse {
  success: boolean;
  access_token: string;
  token_type: string;
  expires_in: number;
  message?: string;
}

export interface PostListResponse {
  success: boolean;
  message: string;
  posts: PostType[];
}

export interface PostType {
  id: string;
  owner_id: string;
  post_media_id: string;
  post_impressions_id: string;
  content: string;
  visibility: string;
  created_at: Date;
  updated_at: Date;
  is_liked: boolean;
  is_owned: boolean;
  media: Media;
  impressions: Impressions;
  user: User;
}

export interface Impressions {
  id: string;
  likes: number;
  views: number;
}

export interface Media {
  id: string;
  images: string;
  videos: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  followers: string;
  following: string;
  liked_contents: string;
  email_verified_at: Date;
  password: string;
  remember_token: string;
  created_at: Date;
  updated_at: Date;
}
