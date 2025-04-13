"use client"

import { useEffect, useState } from "react"
import { PostCard } from "@/components/post-card"

export function PostsList() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts")
      const data = await res.json()
      setPosts(data)
    }

    fetchPosts()
  }, [])

  return (
    <>
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No posts yet. Be the first to create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  )
}
