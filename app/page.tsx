import { Header } from "@/components/header"
import { PostCard } from "@/components/post-card"
import clientPromise from "@/lib/mongodb"
import type { Post } from "@/lib/models"

async function getPosts() {
  const client = await clientPromise
  const db = client.db("blog")

  const posts = await db.collection("posts").find({}).sort({ createdAt: -1 }).toArray()

  return JSON.parse(JSON.stringify(posts))
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts yet. Be the first to create one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: Post & { _id: string }) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
