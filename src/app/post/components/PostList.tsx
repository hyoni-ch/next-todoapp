"use client";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date | string | number;
};

type PostProps = {
  posts: Post[] | undefined;
};

export default function PostList({ posts }: PostProps) {
  return (
    <table className="border-collapse">
      <thead>
        <tr className="">
          <th className="">제목</th>
          <th className="">날짜</th>
        </tr>
      </thead>
      <tbody>
        {posts &&
          posts?.map((post) => (
            <tr key={post.id} className="">
              <Link href={`/post/${post.id}`}>
                <td className="">{post.title}</td>
                <td className="">{post.createdAt.toLocaleString()}</td>
              </Link>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
