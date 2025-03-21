import React from "react";

export default function Blog() {
  const articles = [
    { title: "איך לבחור חברת הובלות?", content: "תוכן המאמר..." },
    { title: "טיפים להובלה חלקה", content: "תוכן המאמר..." },
  ];

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-8">בלוג</h1>
      <div className="grid gap-6">
        {articles.map((article, index) => (
          <article key={index} className="p-4 border rounded shadow">
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p>{article.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
