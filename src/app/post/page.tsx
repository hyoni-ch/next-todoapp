import prisma from "@/prisma/prisma";

import PostList from "./components/PostList";
import PostInput from "./components/PostInput";
import Link from "next/link";

export default async function postPage() {
  const posts = await prisma?.post.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <Link className="hover:text-blue-500" href={`/post/create`}>
        <button>글쓰기</button>
      </Link>

      <PostList posts={posts} />
    </div>
  );
}
