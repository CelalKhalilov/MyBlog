import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import type { Post } from "@/lib/models"

// GET all posts
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("blog")

    const posts = await db.collection("posts").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

// POST a new post
export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("blog")

    const data = await request.json()

    const post: Post = {
      title: data.title,
      content: data.content,
      author: data.author,
      createdAt: new Date(),
    }

    const result = await db.collection("posts").insertOne(post)

    return NextResponse.json(
      {
        message: "Post created successfully",
        postId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
