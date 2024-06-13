import PostList from "./components/PostList";
import Link from "next/link";

export default async function postPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="w-full bg-blue-500 h-12 text-white text-2xl pl-10 pt-1.5">
        Home
      </h1>
      <div className="flex flex-col border rounded-md p-7 mt-10">
        <div className="flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-fit ">
            <Link href={`/post/create`}>글쓰기</Link>
          </button>
        </div>

        <PostList />
      </div>
    </div>
  );
}
