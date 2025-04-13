import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Post } from "@/lib/models"
import { formatDate } from "@/lib/utils"

interface PostCardProps {
  post: Post & { _id: any }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <Link href={`/posts/${post._id}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600 line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-gray-500">
        <span>By {post.author}</span>
        <time dateTime={post.createdAt.toString()}>{formatDate(post.createdAt)}</time>
      </CardFooter>
    </Card>
  )
}
