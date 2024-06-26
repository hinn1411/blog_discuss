import { db } from "@/db";
import type { Comment } from "@prisma/client";

export type CommentWithAuthor = Comment & {
  user: { name: string | null; image: string | null };
};

export function fetchCommentsByPostId(
  postId: string
): Promise<CommentWithAuthor[]> {
  console.log(`fetch comments`);
  
  return db.comment.findMany({
    where: { postId: postId },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}
