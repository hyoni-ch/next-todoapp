import PostList from "./components/PostList";
import Link from "next/link";

export default async function postPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="w-full bg-blue-500 h-12 text-white text-2xl pl-10 pt-1.5">
        Home
      </h1>
      <div className="flex flex-col border p-5 mt-10">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
          <Link href={`/post/create`}>글쓰기</Link>
        </button>

        <PostList />
      </div>
    </div>
  );
}
