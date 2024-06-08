import Link from "next/link";
import React from "react";

export default function page() {
  const menuItems = [
    { title: "ToDo 앱", path: "/todo" },
    { title: "카운터", path: "/counter" },
    { title: "게시판", path: "/post" },
  ];
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl my-4">Menu ~</h1>
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link className="hover:text-blue-500" href={item.path}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
