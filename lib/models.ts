import type { ObjectId } from "mongodb"

export interface Post {
  _id?: ObjectId
  title: string
  content: string
  author: string
  createdAt: Date
  updatedAt?: Date
}

export interface Comment {
  _id?: ObjectId
  postId: ObjectId
  author: string
  content: string
  createdAt: Date
}
