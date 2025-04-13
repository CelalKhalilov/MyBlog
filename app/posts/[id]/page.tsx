import { Header } from "@/components/header"
import clientPromise from "@/lib/mongodb"
import { formatDate } from "@/lib/utils"
import { ObjectId } from "mongodb"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function getPost(id: string) {
  try {
    const client = await clientPromise
    const db = client.db("blog")

    const post = await db.collection("posts").findOne({ _id: new ObjectId(id) })

    if (!post) {
      return null
    }

    return JSON.parse(JSON.stringify(post))
  } catch (error) {
    console.error("Failed to fetch post:", error)
    return null
  }
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          <div className="flex justify-between text-sm text-gray-500 mb-6">
            <span>By {post.author}</span>
            <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
          </div>

          <div className="prose max-w-none">
            {post.content.split("\n").map((paragraph: string, i: number) => (
              <p key={i} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/" passHref>
              <Button variant="outline">Back to Posts</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
