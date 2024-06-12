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
    <div className="flex flex-col">
      <ul className="flex">
        <li className="">제목</li>
        <li className="">날짜</li>
      </ul>

      {posts?.map((post) => (
        <ul key={post.id} className="flex">
          <li className="">
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
          <li className="">{post.createdAt.toLocaleString()}</li>
        </ul>
      ))}
    </div>
  );
}
