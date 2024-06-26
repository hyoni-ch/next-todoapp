import PostList from "./components/PostList";
import Link from "next/link";

export default async function postPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="w-full bg-blue-500 h-12 text-white text-2xl pl-10 pt-1.5">
        Home
      </h1>
      <div className="flex flex-col border rounded-md p-7 mt-10">
        <div className="flex justify-between items-center">
          <h1 className="my-5 text-2xl font-bold">게시판</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            <Link href={`/post/create`} className="block w-full">
              글쓰기
            </Link>
          </button>
        </div>

        <PostList />
      </div>
    </div>
  );
}
