import Link from "next/link";
import { getAllPosts } from "@/app/actions/postAction";

export default async function PostList() {
  const posts = await getAllPosts();

  return (
    <div className="">
      <h1 className="my-5 text-xl">게시판</h1>
      <ul className="grid grid-cols-2 font-bold text-lg">
        <li className="">제목</li>
        <li className="">날짜</li>
      </ul>

      {posts?.map((post) => (
        <ul key={post.id} className="grid grid-cols-2  mt-1">
          <li className="">
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
          <li className="">{post.createdAt.toLocaleString()}</li>
        </ul>
      ))}
    </div>
  );
}
